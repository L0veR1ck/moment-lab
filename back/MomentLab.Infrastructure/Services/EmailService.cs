using System.Net;
using System.Net.Mail;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using MomentLab.Core.Entities;
using MomentLab.Core.Interfaces;

namespace MomentLab.Infrastructure.Services;

public class EmailService(IConfiguration configuration, ILogger<EmailService> logger) : IEmailService
{
    private readonly string smtpServer = configuration["EmailSettings:SmtpServer"] 
        ?? throw new ArgumentNullException(nameof(configuration), "EmailSettings:SmtpServer");
    
    private readonly int smtpPort = int.Parse(configuration["EmailSettings:Port"] ?? "587");
    
    private readonly string username = configuration["EmailSettings:Username"] 
        ?? throw new ArgumentNullException(nameof(configuration), "EmailSettings:Username");
    
    private readonly string password = configuration["EmailSettings:Password"] 
        ?? throw new ArgumentNullException(nameof(configuration), "EmailSettings:Password");
    
    private readonly string fromEmail = configuration["EmailSettings:FromEmail"] 
        ?? throw new ArgumentNullException(nameof(configuration), "EmailSettings:FromEmail");
    
    private readonly List<string> adminEmails = GetAdminEmails(configuration);
    
    private readonly string uploadsPath = configuration["FileStorage:UploadPath"] ?? "wwwroot/uploads";
    
    private readonly TimeZoneInfo yekaterinburgTimeZone = TimeZoneInfo.FindSystemTimeZoneById("Asia/Yekaterinburg");
    
    private static List<string> GetAdminEmails(IConfiguration configuration)
    {
        var emailsString = configuration["EmailSettings:AdminEmails"];
        
        if (string.IsNullOrWhiteSpace(emailsString))
        {
            var fromEmail = configuration["EmailSettings:FromEmail"] 
                ?? throw new ArgumentNullException(nameof(configuration), "EmailSettings:FromEmail");
            return new List<string> { fromEmail };
        }
        
        return emailsString
            .Split(',', StringSplitOptions.RemoveEmptyEntries)
            .Select(email => email.Trim())
            .Where(email => !string.IsNullOrWhiteSpace(email))
            .ToList();
    }

    public async Task<bool> SendApplicationNotificationAsync(ApplicationRequest application)
    {
        try
        {
            using var smtpClient = new SmtpClient(smtpServer, smtpPort)
            {
                EnableSsl = true,
                Credentials = new NetworkCredential(username, password)
            };

            var bodyBuilder = new System.Text.StringBuilder();
            bodyBuilder.AppendLine("<!DOCTYPE html>");
            bodyBuilder.AppendLine("<html>");
            bodyBuilder.AppendLine("<head><meta charset='UTF-8'></head>");
            bodyBuilder.AppendLine("<body style='font-family: Arial, sans-serif; line-height: 1.6; color: #333;'>");
            bodyBuilder.AppendLine("<div style='max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 10px;'>");
            bodyBuilder.AppendLine("<h2 style='color: #2c3e50; border-bottom: 3px solid #3498db; padding-bottom: 10px;'>🔔 Новая заявка</h2>");
            bodyBuilder.AppendLine("<div style='background-color: white; padding: 20px; border-radius: 8px; margin-top: 20px;'>");
            
            bodyBuilder.AppendLine($"<p><strong style='color: #2c3e50;'>Имя клиента:</strong> {application.ClientName}</p>");
            
            if (!string.IsNullOrWhiteSpace(application.ClientEmail))
            {
                bodyBuilder.AppendLine($"<p><strong style='color: #2c3e50;'>Email:</strong> <a href='mailto:{application.ClientEmail}'>{application.ClientEmail}</a></p>");
            }
            
            bodyBuilder.AppendLine($"<p><strong style='color: #2c3e50;'>Телефон:</strong> <a href='tel:{application.ClientPhone}'>{application.ClientPhone}</a></p>");
            
            if (!string.IsNullOrWhiteSpace(application.ClientWishes))
            {
                var wishes = application.ClientWishes.Replace("\n", "<br/>");
                bodyBuilder.AppendLine($"<p><strong style='color: #2c3e50;'>Пожелания:</strong></p>");
                bodyBuilder.AppendLine($"<div style='background-color: #f8f9fa; padding: 15px; border-left: 4px solid #3498db; margin: 10px 0;'>{wishes}</div>");
            }
            
            if (!string.IsNullOrWhiteSpace(application.AttachedFileName))
            {
                bodyBuilder.AppendLine($"<p><strong style='color: #2c3e50;'>Прикрепленный файл:</strong> {application.AttachedFileName} (см. вложение)</p>");
            }
            
            // Конвертируем время в часовой пояс Екатеринбурга
            var createdAtLocal = TimeZoneInfo.ConvertTimeFromUtc(application.CreatedAt, yekaterinburgTimeZone);
            
            if ((application.RequestDate - application.CreatedAt).TotalDays > 1)
            {
                var requestDateLocal = TimeZoneInfo.ConvertTimeFromUtc(application.RequestDate, yekaterinburgTimeZone);
                bodyBuilder.AppendLine($"<p><strong style='color: #2c3e50;'>Дата события:</strong> {requestDateLocal:dd.MM.yyyy}</p>");
            }
            
            bodyBuilder.AppendLine($"<p><strong style='color: #2c3e50;'>Дата создания заявки:</strong> {createdAtLocal:dd.MM.yyyy HH:mm} (Екб)</p>");
            
            bodyBuilder.AppendLine("</div>");
            bodyBuilder.AppendLine("</div>");
            bodyBuilder.AppendLine("</body>");
            bodyBuilder.AppendLine("</html>");

            var sentCount = 0;
            
            foreach (var adminEmail in adminEmails)
            {
                try
                {
                    using var mailMessage = new MailMessage
                    {
                        From = new MailAddress(fromEmail),
                        Subject = $"🔔 Новая заявка от {application.ClientName}",
                        Body = bodyBuilder.ToString(),
                        IsBodyHtml = true
                    };

                    mailMessage.To.Add(adminEmail);

                    if (!string.IsNullOrWhiteSpace(application.AttachedFileUrl))
                    {
                        try
                        {
                            var filePath = GetLocalFilePath(application.AttachedFileUrl);
                            
                            if (File.Exists(filePath))
                            {
                                var attachment = new Attachment(filePath);
                                if (!string.IsNullOrWhiteSpace(application.AttachedFileName))
                                {
                                    attachment.Name = application.AttachedFileName;
                                }
                                mailMessage.Attachments.Add(attachment);
                                
                                logger.LogInformation("Email attachment added: {FileName} for application {ApplicationId}",
                                    application.AttachedFileName, application.Id);
                            }
                            else
                            {
                                logger.LogWarning("File not found at path {FilePath} for application {ApplicationId}, sending email without attachment",
                                    filePath, application.Id);
                            }
                        }
                        catch (Exception fileEx)
                        {
                            logger.LogError(fileEx,
                                "Error attaching file to email for application {ApplicationId}, sending email without attachment",
                                application.Id);
                        }
                    }

                    await smtpClient.SendMailAsync(mailMessage);
                    
                    logger.LogInformation("Email notification sent to {AdminEmail} for application {ApplicationId}", 
                        adminEmail, application.Id);
                    sentCount++;
                }
                catch (Exception emailEx)
                {
                    logger.LogError(emailEx,
                        "Error sending email to {AdminEmail} for application {ApplicationId}",
                        adminEmail, application.Id);
                }
            }
            
            return sentCount > 0;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error sending email notification for application {ApplicationId}", application.Id);
            return false;
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
}

