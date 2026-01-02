using Microsoft.EntityFrameworkCore;
using MomentLab.Core.Entities;
using MomentLab.Core.Interfaces;
using MomentLab.Infrastructure.Data;

namespace MomentLab.Infrastructure.Repositories;

public class TeamMemberRepository : ITeamMemberRepository
{
    private readonly ApplicationDbContext _context;

    public TeamMemberRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<TeamMember?> GetByIdAsync(Guid id)
    {
        return await _context.TeamMembers.FindAsync(id);
    }

    public async Task<(IEnumerable<TeamMember> items, int totalCount)> GetAllAsync(
        int page, 
        int pageSize, 
        bool? isActive = null)
    {
        var query = _context.TeamMembers.AsQueryable();

        if (isActive.HasValue)
        {
            query = query.Where(t => t.IsActive == isActive.Value);
        }

        var totalCount = await query.CountAsync();

        var items = await query
            .OrderBy(t => t.DisplayOrder)
            .ThenByDescending(t => t.CreatedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return (items, totalCount);
    }

    public async Task<TeamMember> CreateAsync(TeamMember teamMember)
    {
        teamMember.Id = Guid.NewGuid();
        teamMember.CreatedAt = DateTime.UtcNow;
        teamMember.UpdatedAt = DateTime.UtcNow;

        _context.TeamMembers.Add(teamMember);
        await _context.SaveChangesAsync();

        return teamMember;
    }

    public async Task<TeamMember> UpdateAsync(TeamMember teamMember)
    {
        teamMember.UpdatedAt = DateTime.UtcNow;

        _context.TeamMembers.Update(teamMember);
        await _context.SaveChangesAsync();

        return teamMember;
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var teamMember = await _context.TeamMembers.FindAsync(id);
        if (teamMember == null)
        {
            return false;
        }

        _context.TeamMembers.Remove(teamMember);
        await _context.SaveChangesAsync();

        return true;
    }
}

