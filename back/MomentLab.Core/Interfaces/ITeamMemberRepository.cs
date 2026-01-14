using MomentLab.Core.Entities;

namespace MomentLab.Core.Interfaces;

public interface ITeamMemberRepository
{
    Task<TeamMember?> GetByIdAsync(Guid id);
    Task<(IEnumerable<TeamMember> items, int totalCount)> GetAllAsync(int page, int pageSize, bool? isActive = null);
    Task<TeamMember> CreateAsync(TeamMember teamMember);
    Task<TeamMember> UpdateAsync(TeamMember teamMember);
    Task<bool> DeleteAsync(Guid id);
}



