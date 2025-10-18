using MomentLab.Core.Enums;

namespace MomentLab.Core.DTOs;

public record UpdateStatusRequest(
    ApplicationStatus Status
);
