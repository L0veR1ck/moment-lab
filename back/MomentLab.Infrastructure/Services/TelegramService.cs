using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using MomentLab.Core.Entities;
using MomentLab.Core.Interfaces;
using Telegram.Bot;
using Telegram.Bot.Types;
using Telegram.Bot.Types.Enums;

namespace MomentLab.Infrastructure.Services;

public class TelegramService : ITelegramService
{
    private readonly TelegramBotClient botClient;
    private readonly ILogger<TelegramService> logger;
    private readonly List<long> adminChatIds;
    private readonly string uploadsPath;
    private readonly TimeZoneInfo yekaterinburgTimeZone;

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

        uploadsPath = configuration["FileStorage:UploadPath"] ?? "wwwroot/uploads";
        
        // Инициализируем часовой пояс Екатеринбурга (GMT+5)
        yekaterinburgTimeZone = TimeZoneInfo.FindSystemTimeZoneById("Asia/Yekaterinburg");
    }

    public async Task<bool> SendApplicationNotificationAsync(ApplicationRequest application)
    {
        try
        {
            var messageBuilder = new System.Text.StringBuilder();
            messageBuilder.AppendLine("🔔 <b>Новая заявка</b>");
            messageBuilder.AppendLine();
            messageBuilder.AppendLine($"<b>Имя:</b> {application.ClientName}");
            
            if (!string.IsNullOrWhiteSpace(application.ClientEmail))
            {
                messageBuilder.AppendLine($"<b>Email:</b> {application.ClientEmail}");
            }
            
            messageBuilder.AppendLine($"<b>Телефон:</b> {application.ClientPhone}");
            
            if (!string.IsNullOrWhiteSpace(application.ClientWishes))
            {
                var wishes = application.ClientWishes.Length > 200 
                    ? application.ClientWishes.Substring(0, 200) + "..." 
                    : application.ClientWishes;
                messageBuilder.AppendLine($"<b>Пожелания:</b> {wishes}");
            }
            
            if (!string.IsNullOrWhiteSpace(application.AttachedFileName))
            {
                messageBuilder.AppendLine($"<b>Прикрепленный файл:</b> {application.AttachedFileName}");
            }
            
            // Конвертируем время создания в часовой пояс Екатеринбурга
            var createdAtLocal = TimeZoneInfo.ConvertTimeFromUtc(application.CreatedAt, yekaterinburgTimeZone);
            
            // Показываем дату события только если она отличается от даты создания (больше чем на 1 день)
            if ((application.RequestDate - application.CreatedAt).TotalDays > 1)
            {
                var requestDateLocal = TimeZoneInfo.ConvertTimeFromUtc(application.RequestDate, yekaterinburgTimeZone);
                messageBuilder.AppendLine($"<b>Дата события:</b> {requestDateLocal:dd.MM.yyyy}");
            }
            
            messageBuilder.AppendLine($"<b>Создано:</b> {createdAtLocal:dd.MM.yyyy HH:mm} (Екб)");
            
            var message = messageBuilder.ToString();

            var sentCount = 0;
            foreach (var chatId in adminChatIds)
            {
                try
                {
                    // Если есть прикрепленный файл, отправляем документ с текстом в caption
                    if (!string.IsNullOrWhiteSpace(application.AttachedFileUrl))
                    {
                        try
                        {
                            var filePath = GetLocalFilePath(application.AttachedFileUrl);
                            
                            if (System.IO.File.Exists(filePath))
                            {
                                using var fileStream = System.IO.File.OpenRead(filePath);
                                var fileName = application.AttachedFileName ?? Path.GetFileName(filePath);
                                
                                await botClient.SendDocument(
                                    chatId: chatId,
                                    document: InputFile.FromStream(fileStream, fileName),
                                    caption: message,
                                    parseMode: ParseMode.Html
                                );

                                logger.LogInformation("Telegram notification with file sent to chat {ChatId} for application {ApplicationId}",
                                    chatId, application.Id);
                            }
                            else
                            {
                                logger.LogWarning("File not found at path {FilePath} for application {ApplicationId}, sending text only",
                                    filePath, application.Id);
                                
                                // Если файл не найден, отправляем просто текстовое сообщение
                                await botClient.SendMessage(
                                    chatId: chatId,
                                    text: message,
                                    parseMode: ParseMode.Html
                                );
                            }
                        }
                        catch (Exception fileEx)
                        {
                            logger.LogError(fileEx,
                                "Error sending file to Telegram chat {ChatId} for application {ApplicationId}, sending text only",
                                chatId, application.Id);
                            
                            // При ошибке с файлом отправляем текстовое сообщение
                            await botClient.SendMessage(
                                chatId: chatId,
                                text: message,
                                parseMode: ParseMode.Html
                            );
                        }
                    }
                    else
                    {
                        // Если файла нет, отправляем обычное текстовое сообщение
                        await botClient.SendMessage(
                            chatId: chatId,
                            text: message,
                            parseMode: ParseMode.Html
                        );
                    }

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

    private string GetLocalFilePath(string fileUrl)
    {
        // Преобразуем URL вида "/uploads/applications/filename.pdf" в локальный путь
        // Убираем начальный слэш и префикс "uploads/"
        var relativePath = fileUrl.TrimStart('/');
        
        // Если путь начинается с "uploads/", убираем это, так как uploadsPath уже содержит "wwwroot/uploads"
        if (relativePath.StartsWith("uploads/", StringComparison.OrdinalIgnoreCase))
        {
            relativePath = relativePath.Substring("uploads/".Length);
        }
        
        relativePath = relativePath.Replace("/", Path.DirectorySeparatorChar.ToString());
        return Path.Combine(uploadsPath, relativePath);
    }
}
