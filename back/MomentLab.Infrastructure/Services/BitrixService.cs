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
            var dealData = new
            {
                fields = new
                {
                    TITLE = $"Заявка от {application.ClientName}",
                    NAME = application.ClientName,
                    PHONE = new[] { new { VALUE = application.ClientPhone, VALUE_TYPE = "WORK" } },
                    ASSIGNED_BY_ID = userId,
                    COMMENTS = $"Дата события: {application.RequestDate:dd.MM.yyyy}"
                }
            };

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
