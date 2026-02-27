using Microsoft.EntityFrameworkCore;
using MomentLab.Core.Entities;
using MomentLab.Core.Interfaces;
using MomentLab.Infrastructure.Data;

namespace MomentLab.Infrastructure.Repositories;

public class PortfolioRepository : IPortfolioRepository
{
    private readonly ApplicationDbContext _context;

    public PortfolioRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<PortfolioProject>> GetAllAsync()
    {
        return await _context.PortfolioProjects
            .Include(p => p.Photos.OrderBy(ph => ph.DisplayOrder))
            .OrderBy(p => p.DisplayOrder)
            .ThenByDescending(p => p.CreatedAt)
            .ToListAsync();
    }

    public async Task<PortfolioProject?> GetByIdAsync(Guid id)
    {
        return await _context.PortfolioProjects
            .Include(p => p.Photos.OrderBy(ph => ph.DisplayOrder))
            .FirstOrDefaultAsync(p => p.Id == id);
    }

    public async Task<PortfolioProject> CreateAsync(PortfolioProject project)
    {
        project.Id = Guid.NewGuid();
        project.CreatedAt = DateTime.UtcNow;
        project.UpdatedAt = DateTime.UtcNow;

        _context.PortfolioProjects.Add(project);
        await _context.SaveChangesAsync();

        return project;
    }

    public async Task<PortfolioProject> UpdateAsync(PortfolioProject project)
    {
        project.UpdatedAt = DateTime.UtcNow;
        _context.PortfolioProjects.Update(project);
        await _context.SaveChangesAsync();
        return project;
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var project = await _context.PortfolioProjects.FindAsync(id);
        if (project == null) return false;

        _context.PortfolioProjects.Remove(project);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<PortfolioPhoto> AddPhotoAsync(PortfolioPhoto photo)
    {
        photo.Id = Guid.NewGuid();
        photo.UploadedAt = DateTime.UtcNow;

        _context.PortfolioPhotos.Add(photo);
        await _context.SaveChangesAsync();

        return photo;
    }

    public async Task<bool> DeletePhotoAsync(Guid photoId)
    {
        var photo = await _context.PortfolioPhotos.FindAsync(photoId);
        if (photo == null) return false;

        _context.PortfolioPhotos.Remove(photo);
        await _context.SaveChangesAsync();
        return true;
    }
}
