namespace MomentLab.Core.DTOs;

public record CreateApplicationRequest(
    string ClientName,
    string ClientPhone,
    DateTime RequestDate
);

