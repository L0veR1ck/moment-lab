namespace MomentLab.Core.Entities;

public class PortfolioPhoto
{
    public Guid Id { get; set; }
    public Guid ProjectId { get; set; }
    public string PhotoUrl { get; set; } = string.Empty;
    public int DisplayOrder { get; set; } = 0;
    public DateTime UploadedAt { get; set; }

    public PortfolioProject Project { get; set; } = null!;
}
