namespace MomentLab.Core.Entities;

public class Event
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string ProgramDescription { get; set; } = string.Empty;
    public string KeyValues { get; set; } = string.Empty;
    public string? MainPhotoUrl { get; set; }
    public bool IsActive { get; set; } = true;
    public int DisplayOrder { get; set; } = 0;
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    
    public ICollection<EventCharacteristic> Characteristics { get; set; } = new List<EventCharacteristic>();
    public ICollection<EventPhoto> Photos { get; set; } = new List<EventPhoto>();
}

