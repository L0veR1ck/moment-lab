namespace MomentLab.Core.DTOs;

public record TeamMemberRequest(
    string FirstName,
    string LastName,
    string? Position,
    string? PhotoUrl,
    string? PhoneNumber,
    string? Wishes,
    string? AttachmentUrl,
    bool IsActive,
    int DisplayOrder
);



