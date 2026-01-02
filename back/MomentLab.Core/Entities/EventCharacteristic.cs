namespace MomentLab.Core.Entities;

public class EventCharacteristic
{
    public Guid Id { get; set; }
    public Guid EventId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Value { get; set; } = string.Empty;
    public int DisplayOrder { get; set; } = 0;
    
    public Event Event { get; set; } = null!;
}

