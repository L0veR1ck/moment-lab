using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using MomentLab.Core.Entities;
using MomentLab.Core.Interfaces;
using Telegram.Bot;
using Telegram.Bot.Types.Enums;

namespace MomentLab.Infrastructure.Services;

public class TelegramService : ITelegramService
{
    private readonly TelegramBotClient botClient;
    private readonly ILogger<TelegramService> logger;
    private readonly List<long> adminChatIds;

    public TelegramService(
        IConfiguration configuration,
        ILogger<TelegramService> logger
    )
    {
        this.logger = logger;

        var botToken = configuration["TelegramSettings:BotToken"]
                       ?? throw new ArgumentNullException(nameof(configuration), "TelegramSettings:BotToken");

        botClient = new TelegramBotClient(botToken);

        var chatIdsString = configuration["TelegramSettings:AdminChatIds"]
                            ?? throw new ArgumentNullException(nameof(configuration), "TelegramSettings:AdminChatIds");

        adminChatIds = chatIdsString
            .Split(',', StringSplitOptions.RemoveEmptyEntries)
            .Select(id => long.Parse(id.Trim()))
            .ToList();
    }

    public async Task<bool> SendApplicationNotificationAsync(ApplicationRequest application)
    {
        try
        {
            var message = $@"🔔 <b>Новая заявка</b>

<b>Имя:</b> {application.ClientName}
<b>Телефон:</b> {application.ClientPhone}
<b>Дата события:</b> {application.RequestDate:dd.MM.yyyy}
<b>Создано:</b> {application.CreatedAt:dd.MM.yyyy HH:mm}";

            var sentCount = 0;
            foreach (var chatId in adminChatIds)
            {
                try
                {
                    await botClient.SendMessage(
                        chatId: chatId,
                        text: message,
                        parseMode: ParseMode.Html
                    );

                    logger.LogInformation("Telegram notification sent to chat {ChatId} for application {ApplicationId}",
                        chatId, application.Id);
                    sentCount++;
                }
                catch (Exception ex)
                {
                    logger.LogError(ex,
                        "Error sending Telegram notification to chat {ChatId} for application {ApplicationId}",
                        chatId, application.Id);
                }
            }

            // Считаем успехом если хотя бы один чат получил сообщение
            return sentCount > 0;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error sending Telegram notifications for application {ApplicationId}", application.Id);
            return false;
        }
    }
}
