namespace MomentLab.Core.Entities;

public class PortfolioProject
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public int DisplayOrder { get; set; } = 0;
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }

    public ICollection<PortfolioPhoto> Photos { get; set; } = new List<PortfolioPhoto>();
}
