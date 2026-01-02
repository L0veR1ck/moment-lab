namespace MomentLab.Core.DTOs;

public record EventResponse(
    Guid Id,
    string Title,
    string Description,
    string ProgramDescription,
    string KeyValues,
    string? MainPhotoUrl,
    bool IsActive,
    int DisplayOrder,
    DateTime CreatedAt,
    DateTime UpdatedAt,
    List<EventCharacteristicResponse> Characteristics,
    List<EventPhotoResponse> Photos
);

public record EventCharacteristicResponse(
    Guid Id,
    string Name,
    string Value,
    int DisplayOrder
);

public record EventPhotoResponse(
    Guid Id,
    string PhotoUrl,
    int DisplayOrder,
    DateTime UploadedAt
);

