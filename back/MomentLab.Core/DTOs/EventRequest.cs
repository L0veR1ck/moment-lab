namespace MomentLab.Core.DTOs;

public record EventRequest(
    string Title,
    string UrlSlug,
    string Description,
    string ProgramDescription,
    string KeyValues,
    string? MainPhotoUrl,
    bool IsActive,
    int DisplayOrder,
    List<EventCharacteristicRequest>? Characteristics
);

public record EventCharacteristicRequest(
    string Name,
    string Value,
    int DisplayOrder
);

public record AddEventPhotoRequest(
    string PhotoUrl,
    int DisplayOrder
);



