using System.Text;
using System.Text.Json;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using MomentLab.Core.Entities;
using MomentLab.Core.Interfaces;

namespace MomentLab.Infrastructure.Services;

public class BitrixService(
    HttpClient httpClient,
    IConfiguration configuration,
    ILogger<BitrixService> logger
) : IBitrixService
{
    private readonly string webhookUrl = configuration["BitrixSettings:WebhookUrl"]
                                         ?? throw new ArgumentNullException(nameof(configuration),
                                             "BitrixSettings:WebhookUrl");

    private readonly string userId = configuration["BitrixSettings:UserId"]
                                     ?? throw new ArgumentNullException(nameof(configuration), "BitrixSettings:UserId");
    
    private readonly string uploadsPath = configuration["FileStorage:UploadPath"] ?? "wwwroot/uploads";

    public async Task<string?> CreateDealAsync(ApplicationRequest application)
    {
        try
        {
            var commentsBuilder = new StringBuilder();
            
            if ((application.RequestDate - application.CreatedAt).TotalDays > 1)
            {
                commentsBuilder.AppendLine($"Дата события: {application.RequestDate:dd.MM.yyyy}");
            }
            
            if (!string.IsNullOrWhiteSpace(application.ClientWishes))
            {
                commentsBuilder.AppendLine($"Пожелания: {application.ClientWishes}");
            }
            
            if (!string.IsNullOrWhiteSpace(application.AttachedFileName))
            {
                commentsBuilder.AppendLine($"Прикрепленный файл: {application.AttachedFileName}");
            }

            var fields = new Dictionary<string, object>
            {
                { "TITLE", $"Заявка от {application.ClientName}" },
                { "NAME", application.ClientName },
                { "PHONE", new[] { new { VALUE = application.ClientPhone, VALUE_TYPE = "WORK" } } },
                { "ASSIGNED_BY_ID", userId }
            };

            if (!string.IsNullOrWhiteSpace(application.ClientEmail))
            {
                fields["EMAIL"] = new[] { new { VALUE = application.ClientEmail, VALUE_TYPE = "WORK" } };
            }

            if (commentsBuilder.Length > 0)
            {
                fields["COMMENTS"] = commentsBuilder.ToString().Trim();
            }

            var dealData = new { fields };

            var content = new StringContent(
                JsonSerializer.Serialize(dealData),
                Encoding.UTF8,
                "application/json"
            );

            var response = await httpClient.PostAsync($"{webhookUrl}/crm.deal.add.json", content);

            if (response.IsSuccessStatusCode)
            {
                var responseContent = await response.Content.ReadAsStringAsync();
                var result = JsonSerializer.Deserialize<BitrixResponse>(responseContent);
                
                var dealId = result?.Result?.ToString();

                if (dealId != null)
                {
                    logger.LogInformation("Deal created successfully in Bitrix. Deal ID: {DealId}", dealId);
                    
                    if (!string.IsNullOrWhiteSpace(application.AttachedFileUrl))
                    {
                        await UploadFileToActivityAsync(dealId, application);
                    }
                    
                    return dealId;
                }
            }

            logger.LogError("Failed to create deal in Bitrix. Status: {StatusCode}", response.StatusCode);
            return null;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error creating deal in Bitrix for application {ApplicationId}", application.Id);
            return null;
        }
    }

    private async Task UploadFileToActivityAsync(string dealId, ApplicationRequest application)
    {
        try
        {
            var filePath = GetLocalFilePath(application.AttachedFileUrl);
            
            if (!File.Exists(filePath))
            {
                logger.LogWarning("File not found at path {FilePath} for Bitrix upload", filePath);
                return;
            }
            var fileBytes = await File.ReadAllBytesAsync(filePath);
            var base64File = Convert.ToBase64String(fileBytes);
            
            var fileName = application.AttachedFileName ?? Path.GetFileName(filePath);

            var activityData = new
            {
                fields = new Dictionary<string, object>
                {
                    { "OWNER_TYPE_ID", "2" }, // 2 = Deal
                    { "OWNER_ID", dealId },
                    { "PROVIDER_ID", "CRM_TODO" },
                    { "PROVIDER_TYPE_ID", "TASK" },
                    { "SUBJECT", $"Прикреплённый файл: {fileName}" },
                    { "COMPLETED", "Y" },
                    { "RESPONSIBLE_ID", userId },
                    { "DESCRIPTION", "Файл из заявки с сайта" },
                    { "FILES", new[]
                        {
                            new Dictionary<string, string>
                            {
                                { "name", fileName },
                                { "data", base64File }
                            }
                        }
                    }
                }
            };

            var activityContent = new StringContent(
                JsonSerializer.Serialize(activityData),
                Encoding.UTF8,
                "application/json"
            );

            var activityResponse = await httpClient.PostAsync($"{webhookUrl}/crm.activity.add.json", activityContent);

            if (activityResponse.IsSuccessStatusCode)
            {
                logger.LogInformation("File uploaded to Bitrix activity for deal {DealId}: {FileName}", dealId, fileName);
            }
            else
            {
                var errorContent = await activityResponse.Content.ReadAsStringAsync();
                logger.LogError("Failed to upload file to Bitrix activity. Status: {StatusCode}, Response: {Response}", 
                    activityResponse.StatusCode, errorContent);
            }
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error uploading file to Bitrix activity for deal {DealId}", dealId);
        }
    }
    
    private string GetLocalFilePath(string fileUrl)
    {
        var relativePath = fileUrl.TrimStart('/');
        
        if (relativePath.StartsWith("uploads/", StringComparison.OrdinalIgnoreCase))
        {
            relativePath = relativePath.Substring("uploads/".Length);
        }
        
        relativePath = relativePath.Replace("/", Path.DirectorySeparatorChar.ToString());
        return Path.Combine(uploadsPath, relativePath);
    }

    private record BitrixResponse(int? Result);
}
