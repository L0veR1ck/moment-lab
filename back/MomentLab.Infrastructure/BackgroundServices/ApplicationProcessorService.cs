using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using MomentLab.Core.Interfaces;

namespace MomentLab.Infrastructure.BackgroundServices;

public class ApplicationProcessorService(
    IServiceProvider serviceProvider,
    ILogger<ApplicationProcessorService> logger
) : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        logger.LogInformation("Application Processor Service started");

        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                using var scope = serviceProvider.CreateScope();
                var repository = scope.ServiceProvider.GetRequiredService<IApplicationRepository>();
                var telegramService = scope.ServiceProvider.GetRequiredService<ITelegramService>();
                var bitrixService = scope.ServiceProvider.GetRequiredService<IBitrixService>();
                var emailService = scope.ServiceProvider.GetRequiredService<IEmailService>();
                var notificationSettingsRepository = scope.ServiceProvider.GetRequiredService<INotificationSettingsRepository>();

                // Получаем настройки уведомлений из базы данных
                var notificationSettings = await notificationSettingsRepository.GetSettingsAsync();
                var enableTelegram = notificationSettings.IsTelegramEnabled;
                var enableEmail = notificationSettings.IsEmailEnabled;
                var enableBitrix = notificationSettings.IsBitrixEnabled;

                var unprocessedApplications = await repository.GetUnprocessedApplicationsAsync();

                foreach (var application in unprocessedApplications)
                {
                    var updated = false;

                    // Telegram уведомление
                    if (!application.IsTelegramNotificationSent)
                    {
                        if (!enableTelegram)
                        {
                            logger.LogInformation(
                                "Telegram integration disabled, skipping for application {ApplicationId}",
                                application.Id);
                        }
                        else
                        {
                            var telegramSent = await telegramService.SendApplicationNotificationAsync(application);
                            if (telegramSent)
                            {
                                application.IsTelegramNotificationSent = true;
                                updated = true;
                                logger.LogInformation("Telegram notification sent for application {ApplicationId}",
                                    application.Id);
                            }
                        }
                    }

                    // Bitrix интеграция
                    if (!application.IsBitrixSent)
                    {
                        if (!enableBitrix)
                        {
                            logger.LogInformation(
                                "Bitrix integration disabled, skipping for application {ApplicationId}",
                                application.Id);
                        }
                        else
                        {
                            var dealId = await bitrixService.CreateDealAsync(application);
                            if (!string.IsNullOrEmpty(dealId))
                            {
                                application.IsBitrixSent = true;
                                application.BitrixDealId = dealId;
                                updated = true;
                                logger.LogInformation("Bitrix deal created for application {ApplicationId}",
                                    application.Id);
                            }
                        }
                    }

                    // Email уведомление
                    if (!application.IsEmailSent)
                    {
                        if (!enableEmail)
                        {
                            logger.LogInformation(
                                "Email integration disabled, skipping for application {ApplicationId}", application.Id);
                        }
                        else
                        {
                            var emailSent = await emailService.SendApplicationNotificationAsync(application);
                            if (emailSent)
                            {
                                application.IsEmailSent = true;
                                updated = true;
                                logger.LogInformation("Email notification sent for application {ApplicationId}",
                                    application.Id);
                            }
                        }
                    }

                    if (updated)
                    {
                        await repository.UpdateAsync(application);
                    }
                }

                // Wait 30 seconds before next check
                await Task.Delay(TimeSpan.FromSeconds(30), stoppingToken);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Error processing applications");
                await Task.Delay(TimeSpan.FromSeconds(60), stoppingToken);
            }
        }

        logger.LogInformation("Application Processor Service stopped");
    }
}
