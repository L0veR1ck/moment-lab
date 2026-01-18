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

                logger.LogInformation("Deal created successfully in Bitrix. Deal ID: {DealId}", result?.Result);
                return result?.Result?.ToString();
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

    private record BitrixResponse(int? Result);
}
