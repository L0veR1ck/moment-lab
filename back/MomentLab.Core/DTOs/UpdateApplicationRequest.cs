namespace MomentLab.Core.DTOs;

public record UpdateApplicationRequest(
    string ClientName,
    string ClientPhone,
    DateTime RequestDate,
    int Status
);



