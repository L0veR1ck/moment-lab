namespace MomentLab.Core.DTOs;

public record TeamMemberResponse(
    Guid Id,
    string FirstName,
    string LastName,
    string? Position,
    string? PhotoUrl,
    bool IsActive,
    int DisplayOrder,
    DateTime CreatedAt,
    DateTime UpdatedAt
);



