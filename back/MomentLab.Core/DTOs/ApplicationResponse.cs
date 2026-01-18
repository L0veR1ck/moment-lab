using MomentLab.Core.Enums;

namespace MomentLab.Core.DTOs;

public record ApplicationResponse(
    Guid Id,
    string ClientName,
    string? ClientEmail,
    string ClientPhone,
    string? ClientWishes,
    string? AttachedFileName,
    string? AttachedFileUrl,
    DateTime RequestDate,
    ApplicationStatus Status,
    bool IsTelegramNotificationSent,
    bool IsBitrixSent,
    bool IsEmailSent,
    string? BitrixDealId,
    DateTime CreatedAt,
    DateTime UpdatedAt
);
