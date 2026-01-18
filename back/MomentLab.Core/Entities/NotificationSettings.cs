namespace MomentLab.Core.Entities;

public class NotificationSettings
{
    public Guid Id { get; set; }
    public bool IsTelegramEnabled { get; set; } = true;
    public bool IsEmailEnabled { get; set; } = true;
    public bool IsBitrixEnabled { get; set; } = true;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
