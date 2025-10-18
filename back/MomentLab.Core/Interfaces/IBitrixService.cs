using MomentLab.Core.Entities;

namespace MomentLab.Core.Interfaces;

public interface IBitrixService
{
    Task<string?> CreateDealAsync(ApplicationRequest application);
}

