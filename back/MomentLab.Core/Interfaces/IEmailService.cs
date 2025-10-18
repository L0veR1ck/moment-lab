using MomentLab.Core.Entities;

namespace MomentLab.Core.Interfaces;

public interface IEmailService
{
    Task<bool> SendApplicationNotificationAsync(ApplicationRequest application);
}

