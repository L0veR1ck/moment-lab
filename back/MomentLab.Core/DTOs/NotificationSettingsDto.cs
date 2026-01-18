namespace MomentLab.Core.DTOs;

public record NotificationSettingsDto(
    Guid Id,
    bool IsTelegramEnabled,
    bool IsEmailEnabled,
    bool IsBitrixEnabled,
    DateTime UpdatedAt
);

public record UpdateNotificationSettingsRequest(
    bool IsTelegramEnabled,
    bool IsEmailEnabled,
    bool IsBitrixEnabled
);
