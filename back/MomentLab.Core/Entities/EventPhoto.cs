namespace MomentLab.Core.Entities;

public class EventPhoto
{
    public Guid Id { get; set; }
    public Guid EventId { get; set; }
    public string PhotoUrl { get; set; } = string.Empty;
    public int DisplayOrder { get; set; } = 0;
    public DateTime UploadedAt { get; set; }
    
    public Event Event { get; set; } = null!;
}

