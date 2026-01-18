using Microsoft.AspNetCore.Mvc;
using MomentLab.API.Attributes;
using MomentLab.Core.DTOs;
using MomentLab.Core.Interfaces;

namespace MomentLab.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[AdminAuthorize]
public class NotificationSettingsController(
    INotificationSettingsRepository repository,
    ILogger<NotificationSettingsController> logger
) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<NotificationSettingsDto>> GetSettings()
    {
        try
        {
            var settings = await repository.GetSettingsAsync();
            
            var dto = new NotificationSettingsDto(
                settings.Id,
                settings.IsTelegramEnabled,
                settings.IsEmailEnabled,
                settings.IsBitrixEnabled,
                settings.UpdatedAt
            );
            
            return Ok(dto);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error getting notification settings");
            return StatusCode(500, "Error getting notification settings");
        }
    }

    [HttpPut]
    public async Task<ActionResult<NotificationSettingsDto>> UpdateSettings(
        [FromBody] UpdateNotificationSettingsRequest request)
    {
        try
        {
            var settings = await repository.GetSettingsAsync();
            
            settings.IsTelegramEnabled = request.IsTelegramEnabled;
            settings.IsEmailEnabled = request.IsEmailEnabled;
            settings.IsBitrixEnabled = request.IsBitrixEnabled;
            
            var updatedSettings = await repository.UpdateSettingsAsync(settings);
            
            var dto = new NotificationSettingsDto(
                updatedSettings.Id,
                updatedSettings.IsTelegramEnabled,
                updatedSettings.IsEmailEnabled,
                updatedSettings.IsBitrixEnabled,
                updatedSettings.UpdatedAt
            );
            
            logger.LogInformation("Notification settings updated: Telegram={Telegram}, Email={Email}, Bitrix={Bitrix}",
                updatedSettings.IsTelegramEnabled, updatedSettings.IsEmailEnabled, updatedSettings.IsBitrixEnabled);
            
            return Ok(dto);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error updating notification settings");
            return StatusCode(500, "Error updating notification settings");
        }
    }
}
