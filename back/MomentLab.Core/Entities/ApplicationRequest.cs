using MomentLab.Core.Enums;

namespace MomentLab.Core.Entities;

public class ApplicationRequest
{
    public Guid Id { get; set; }
    public string ClientName { get; set; } = string.Empty;
    public string? ClientEmail { get; set; }
    public string ClientPhone { get; set; } = string.Empty;
    public string? ClientWishes { get; set; }
    public string? AttachedFileName { get; set; }
    public string? AttachedFileUrl { get; set; }
    public DateTime RequestDate { get; set; }
    public ApplicationStatus Status { get; set; }
    public bool IsTelegramNotificationSent { get; set; }
    public bool IsBitrixSent { get; set; }
    public bool IsEmailSent { get; set; }
    public string? BitrixDealId { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}

