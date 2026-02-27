using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MomentLab.API.Attributes;
using MomentLab.Core.DTOs;
using MomentLab.Core.Entities;
using MomentLab.Core.Interfaces;

namespace MomentLab.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PortfolioController(
    IPortfolioRepository repository,
    ILogger<PortfolioController> logger
) : ControllerBase
{
    [HttpGet]
    [AllowAnonymous]
    public async Task<ActionResult<List<PortfolioProjectResponse>>> GetAll()
    {
        try
        {
            var projects = await repository.GetAllAsync();
            return Ok(projects.Select(MapToResponse).ToList());
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error getting portfolio projects");
            return StatusCode(500, "Internal server error");
        }
    }

    [HttpGet("{id:guid}")]
    [AllowAnonymous]
    public async Task<ActionResult<PortfolioProjectResponse>> GetById(Guid id)
    {
        try
        {
            var project = await repository.GetByIdAsync(id);
            if (project == null) return NotFound();
            return Ok(MapToResponse(project));
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error getting portfolio project {Id}", id);
            return StatusCode(500, "Internal server error");
        }
    }

    [HttpPost]
    [AdminAuthorize]
    public async Task<ActionResult<PortfolioProjectResponse>> Create([FromBody] PortfolioProjectRequest request)
    {
        try
        {
            var project = new PortfolioProject
            {
                Title = request.Title,
                DisplayOrder = request.DisplayOrder,
            };

            var created = await repository.CreateAsync(project);
            logger.LogInformation("Portfolio project created: {Id}", created.Id);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, MapToResponse(created));
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error creating portfolio project");
            return StatusCode(500, "Internal server error");
        }
    }

    [HttpPut("{id:guid}")]
    [AdminAuthorize]
    public async Task<ActionResult<PortfolioProjectResponse>> Update(Guid id, [FromBody] PortfolioProjectRequest request)
    {
        try
        {
            var existing = await repository.GetByIdAsync(id);
            if (existing == null) return NotFound();

            existing.Title = request.Title;
            existing.DisplayOrder = request.DisplayOrder;

            var updated = await repository.UpdateAsync(existing);
            logger.LogInformation("Portfolio project updated: {Id}", id);
            return Ok(MapToResponse(updated));
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error updating portfolio project {Id}", id);
            return StatusCode(500, "Internal server error");
        }
    }

    [HttpDelete("{id:guid}")]
    [AdminAuthorize]
    public async Task<ActionResult> Delete(Guid id)
    {
        try
        {
            var result = await repository.DeleteAsync(id);
            if (!result) return NotFound();
            logger.LogInformation("Portfolio project deleted: {Id}", id);
            return NoContent();
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error deleting portfolio project {Id}", id);
            return StatusCode(500, "Internal server error");
        }
    }

    [HttpPost("{id:guid}/photos")]
    [AdminAuthorize]
    public async Task<ActionResult<PortfolioPhotoResponse>> AddPhoto(Guid id, [FromBody] AddPortfolioPhotoRequest request)
    {
        try
        {
            var project = await repository.GetByIdAsync(id);
            if (project == null) return NotFound();

            var photo = new PortfolioPhoto
            {
                ProjectId = id,
                PhotoUrl = request.PhotoUrl,
                DisplayOrder = request.DisplayOrder,
            };

            var created = await repository.AddPhotoAsync(photo);
            logger.LogInformation("Photo added to portfolio project {Id}", id);
            return Ok(new PortfolioPhotoResponse(created.Id, created.PhotoUrl, created.DisplayOrder, created.UploadedAt));
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error adding photo to portfolio project {Id}", id);
            return StatusCode(500, "Internal server error");
        }
    }

    [HttpDelete("{projectId:guid}/photos/{photoId:guid}")]
    [AdminAuthorize]
    public async Task<ActionResult> DeletePhoto(Guid projectId, Guid photoId)
    {
        try
        {
            var result = await repository.DeletePhotoAsync(photoId);
            if (!result) return NotFound();
            logger.LogInformation("Photo {PhotoId} deleted from portfolio project {ProjectId}", photoId, projectId);
            return NoContent();
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error deleting photo {PhotoId}", photoId);
            return StatusCode(500, "Internal server error");
        }
    }

    private static PortfolioProjectResponse MapToResponse(PortfolioProject project) =>
        new(
            project.Id,
            project.Title,
            project.DisplayOrder,
            project.CreatedAt,
            project.UpdatedAt,
            project.Photos.Select(p => new PortfolioPhotoResponse(p.Id, p.PhotoUrl, p.DisplayOrder, p.UploadedAt)).ToList()
        );
}
