namespace MomentLab.Core.DTOs;

public record UpdateApplicationRequest(
    string ClientName,
    string? ClientEmail,
    string ClientPhone,
    string? ClientWishes,
    string? AttachedFileName,
    string? AttachedFileUrl,
    DateTime RequestDate,
    int Status
);



