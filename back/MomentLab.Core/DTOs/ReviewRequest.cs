namespace MomentLab.Core.DTOs;

public record ReviewRequest(
    string ClientName,
    string ReviewText,
    int Rating
);

