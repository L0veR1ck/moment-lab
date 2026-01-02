namespace MomentLab.Core.Entities;

public class Review
{
    public Guid Id { get; set; }
    public string ClientName { get; set; } = string.Empty;
    public string ReviewText { get; set; } = string.Empty;
    public bool IsApproved { get; set; } = false;
    public int Rating { get; set; } = 5;
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}

