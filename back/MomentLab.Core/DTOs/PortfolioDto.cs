namespace MomentLab.Core.DTOs;

public record PortfolioProjectRequest(
    string Title,
    int DisplayOrder
);

public record AddPortfolioPhotoRequest(
    string PhotoUrl,
    int DisplayOrder
);

public record PortfolioPhotoResponse(
    Guid Id,
    string PhotoUrl,
    int DisplayOrder,
    DateTime UploadedAt
);

public record PortfolioProjectResponse(
    Guid Id,
    string Title,
    int DisplayOrder,
    DateTime CreatedAt,
    DateTime UpdatedAt,
    List<PortfolioPhotoResponse> Photos
);
