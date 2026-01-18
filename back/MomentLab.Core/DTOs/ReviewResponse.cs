namespace MomentLab.Core.DTOs;

public record ReviewResponse(
    Guid Id,
    string ClientName,
    string ReviewText,
    bool IsApproved,
    int Rating,
    DateTime CreatedAt,
    DateTime UpdatedAt
);



