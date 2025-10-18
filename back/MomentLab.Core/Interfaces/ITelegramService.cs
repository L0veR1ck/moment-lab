using MomentLab.Core.Entities;

namespace MomentLab.Core.Interfaces;

public interface ITelegramService
{
    Task<bool> SendApplicationNotificationAsync(ApplicationRequest application);
}

