namespace MomentLab.Core.DTOs;

public record TeamMemberRequest(
    string FirstName,
    string LastName,
    string? Position,
    string? PhotoUrl,
    bool IsActive,
    int DisplayOrder
);



