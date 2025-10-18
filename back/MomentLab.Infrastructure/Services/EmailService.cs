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

    public async Task<bool> SendApplicationNotificationAsync(ApplicationRequest application)
    {
        try
        {
            using var smtpClient = new SmtpClient(smtpServer, smtpPort)
            {
                EnableSsl = true,
                Credentials = new NetworkCredential(username, password)
            };

            var mailMessage = new MailMessage
            {
                From = new MailAddress(fromEmail),
                Subject = $"Новая заявка от {application.ClientName}",
                Body = $@"
                    <h2>Новая заявка</h2>
                    <p><strong>Имя клиента:</strong> {application.ClientName}</p>
                    <p><strong>Телефон:</strong> {application.ClientPhone}</p>
                    <p><strong>Дата события:</strong> {application.RequestDate:dd.MM.yyyy}</p>
                    <p><strong>Дата создания заявки:</strong> {application.CreatedAt:dd.MM.yyyy HH:mm}</p>
                ",
                IsBodyHtml = true
            };

            mailMessage.To.Add(fromEmail); // Send to self or configure admin emails

            await smtpClient.SendMailAsync(mailMessage);
            
            logger.LogInformation("Email notification sent for application {ApplicationId}", application.Id);
            return true;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error sending email notification for application {ApplicationId}", application.Id);
            return false;
        }
    }
}

