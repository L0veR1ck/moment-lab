using Microsoft.AspNetCore.Mvc;
using MomentLab.API.Attributes;
using MomentLab.Core.DTOs;
using MomentLab.Core.Entities;
using MomentLab.Core.Interfaces;

namespace MomentLab.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[AdminAuthorize]
public class TeamMembersController(
    ITeamMemberRepository repository,
    ILogger<TeamMembersController> logger
) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<object>> GetAll(
        [FromQuery] int page = 1, 
        [FromQuery] int pageSize = 10,
        [FromQuery] bool? isActive = null)
    {
        try
        {
            if (page < 1) page = 1;
            if (pageSize < 1 || pageSize > 100) pageSize = 10;

            var (items, totalCount) = await repository.GetAllAsync(page, pageSize, isActive);

            var responses = items.Select(MapToResponse).ToList();

            return Ok(new
            {
                items = responses,
                totalCount,
                page,
                pageSize,
                totalPages = (int)Math.Ceiling(totalCount / (double)pageSize)
            });
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error getting team members");
            return StatusCode(500, "Internal server error");
        }
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<TeamMemberResponse>> GetById(Guid id)
    {
        try
        {
            var teamMember = await repository.GetByIdAsync(id);

            if (teamMember == null)
                return NotFound();

            return Ok(MapToResponse(teamMember));
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error getting team member {TeamMemberId}", id);
            return StatusCode(500, "Internal server error");
        }
    }

    [HttpPost]
    public async Task<ActionResult<TeamMemberResponse>> Create([FromBody] TeamMemberRequest request)
    {
        try
        {
            var teamMember = new TeamMember
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                Position = request.Position,
                PhotoUrl = request.PhotoUrl,
                PhoneNumber = request.PhoneNumber,
                Wishes = request.Wishes,
                AttachmentUrl = request.AttachmentUrl,
                IsActive = request.IsActive,
                DisplayOrder = request.DisplayOrder
            };

            var created = await repository.CreateAsync(teamMember);

            logger.LogInformation("Team member created: {TeamMemberId}", created.Id);

            return CreatedAtAction(nameof(GetById), new { id = created.Id }, MapToResponse(created));
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error creating team member");
            return StatusCode(500, "Internal server error");
        }
    }

    [HttpPut("{id:guid}")]
    public async Task<ActionResult<TeamMemberResponse>> Update(Guid id, [FromBody] TeamMemberRequest request)
    {
        try
        {
            var existing = await repository.GetByIdAsync(id);

            if (existing == null)
                return NotFound();

            existing.FirstName = request.FirstName;
            existing.LastName = request.LastName;
            existing.Position = request.Position;
            existing.PhotoUrl = request.PhotoUrl;
            existing.PhoneNumber = request.PhoneNumber;
            existing.Wishes = request.Wishes;
            existing.AttachmentUrl = request.AttachmentUrl;
            existing.IsActive = request.IsActive;
            existing.DisplayOrder = request.DisplayOrder;

            var updated = await repository.UpdateAsync(existing);

            logger.LogInformation("Team member updated: {TeamMemberId}", id);

            return Ok(MapToResponse(updated));
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error updating team member {TeamMemberId}", id);
            return StatusCode(500, "Internal server error");
        }
    }

    [HttpDelete("{id:guid}")]
    public async Task<ActionResult> Delete(Guid id)
    {
        try
        {
            var result = await repository.DeleteAsync(id);

            if (!result)
                return NotFound();

            logger.LogInformation("Team member deleted: {TeamMemberId}", id);

            return NoContent();
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error deleting team member {TeamMemberId}", id);
            return StatusCode(500, "Internal server error");
        }
    }

    private static TeamMemberResponse MapToResponse(TeamMember teamMember)
    {
        return new TeamMemberResponse(
            teamMember.Id,
            teamMember.FirstName,
            teamMember.LastName,
            teamMember.Position,
            teamMember.PhotoUrl,
            teamMember.PhoneNumber,
            teamMember.Wishes,
            teamMember.AttachmentUrl,
            teamMember.IsActive,
            teamMember.DisplayOrder,
            teamMember.CreatedAt,
            teamMember.UpdatedAt
        );
    }
}



