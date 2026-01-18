namespace MomentLab.Core.DTOs;

public record CreateApplicationRequest(
    string ClientName,
    string? ClientEmail,
    string ClientPhone,
    string? ClientWishes,
    string? AttachedFileName,
    string? AttachedFileUrl,
    DateTime? RequestDate = null,
    int Status = 0
);

