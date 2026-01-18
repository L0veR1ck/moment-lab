using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MomentLab.API.Attributes;
using MomentLab.Core.DTOs;
using MomentLab.Core.Entities;
using MomentLab.Core.Interfaces;

namespace MomentLab.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EventsController(
    IEventRepository repository,
    ILogger<EventsController> logger
) : ControllerBase
{
    [HttpGet]
    [AllowAnonymous]
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
            logger.LogError(ex, "Error getting events");
            return StatusCode(500, "Internal server error");
        }
    }

    [HttpGet("{id:guid}")]
    [AllowAnonymous]
    public async Task<ActionResult<EventResponse>> GetById(Guid id)
    {
        try
        {
            var @event = await repository.GetByIdAsync(id);

            if (@event == null)
                return NotFound();

            return Ok(MapToResponse(@event));
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error getting event {EventId}", id);
            return StatusCode(500, "Internal server error");
        }
    }

    [HttpGet("by-slug/{slug}")]
    [AllowAnonymous]
    public async Task<ActionResult<EventResponse>> GetBySlug(string slug)
    {
        try
        {
            var @event = await repository.GetBySlugAsync(slug);

            if (@event == null)
                return NotFound();

            return Ok(MapToResponse(@event));
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error getting event by slug {Slug}", slug);
            return StatusCode(500, "Internal server error");
        }
    }

    [HttpPost]
    [AdminAuthorize]
    public async Task<ActionResult<EventResponse>> Create([FromBody] EventRequest request)
    {
        try
        {
            var @event = new Event
            {
                Title = request.Title,
                UrlSlug = request.UrlSlug,
                Description = request.Description,
                ProgramDescription = request.ProgramDescription,
                KeyValues = request.KeyValues,
                MainPhotoUrl = request.MainPhotoUrl,
                IsActive = request.IsActive,
                DisplayOrder = request.DisplayOrder,
                Characteristics = request.Characteristics?.Select(c => new EventCharacteristic
                {
                    Name = c.Name,
                    Value = c.Value,
                    DisplayOrder = c.DisplayOrder
                }).ToList() ?? new List<EventCharacteristic>()
            };

            var created = await repository.CreateAsync(@event);

            logger.LogInformation("Event created: {EventId}", created.Id);

            return CreatedAtAction(nameof(GetById), new { id = created.Id }, MapToResponse(created));
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error creating event");
            return StatusCode(500, "Internal server error");
        }
    }

    [HttpPut("{id:guid}")]
    [AdminAuthorize]
    public async Task<ActionResult<EventResponse>> Update(Guid id, [FromBody] EventRequest request)
    {
        try
        {
            var existing = await repository.GetByIdAsync(id);

            if (existing == null)
                return NotFound();

            existing.Title = request.Title;
            existing.UrlSlug = request.UrlSlug;
            existing.Description = request.Description;
            existing.ProgramDescription = request.ProgramDescription;
            existing.KeyValues = request.KeyValues;
            existing.MainPhotoUrl = request.MainPhotoUrl;
            existing.IsActive = request.IsActive;
            existing.DisplayOrder = request.DisplayOrder;

            existing.Characteristics = request.Characteristics?.Select(c => new EventCharacteristic
            {
                Name = c.Name,
                Value = c.Value,
                DisplayOrder = c.DisplayOrder
            }).ToList() ?? new List<EventCharacteristic>();

            var updated = await repository.UpdateAsync(existing);

            logger.LogInformation("Event updated: {EventId}", id);

            return Ok(MapToResponse(updated));
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error updating event {EventId}", id);
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

            if (!result)
                return NotFound();

            logger.LogInformation("Event deleted: {EventId}", id);

            return NoContent();
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error deleting event {EventId}", id);
            return StatusCode(500, "Internal server error");
        }
    }

    [HttpPost("{id:guid}/photos")]
    [AdminAuthorize]
    public async Task<ActionResult<EventPhotoResponse>> AddPhoto(Guid id, [FromBody] AddEventPhotoRequest request)
    {
        try
        {
            var @event = await repository.GetByIdAsync(id);

            if (@event == null)
                return NotFound();

            // Check if we already have 10 photos
            if (@event.Photos.Count >= 10)
            {
                return BadRequest("Maximum 10 photos allowed per event");
            }

            var photo = new EventPhoto
            {
                EventId = id,
                PhotoUrl = request.PhotoUrl,
                DisplayOrder = request.DisplayOrder
            };

            var created = await repository.AddPhotoAsync(photo);

            logger.LogInformation("Photo added to event {EventId}", id);

            return Ok(new EventPhotoResponse(
                created.Id,
                created.PhotoUrl,
                created.DisplayOrder,
                created.UploadedAt
            ));
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error adding photo to event {EventId}", id);
            return StatusCode(500, "Internal server error");
        }
    }

    [HttpDelete("{eventId:guid}/photos/{photoId:guid}")]
    [AdminAuthorize]
    public async Task<ActionResult> DeletePhoto(Guid eventId, Guid photoId)
    {
        try
        {
            var result = await repository.DeletePhotoAsync(photoId);

            if (!result)
                return NotFound();

            logger.LogInformation("Photo {PhotoId} deleted from event {EventId}", photoId, eventId);

            return NoContent();
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error deleting photo {PhotoId} from event {EventId}", photoId, eventId);
            return StatusCode(500, "Internal server error");
        }
    }

    private static EventResponse MapToResponse(Event @event)
    {
        return new EventResponse(
            @event.Id,
            @event.Title,
            @event.UrlSlug,
            @event.Description,
            @event.ProgramDescription,
            @event.KeyValues,
            @event.MainPhotoUrl,
            @event.IsActive,
            @event.DisplayOrder,
            @event.CreatedAt,
            @event.UpdatedAt,
            @event.Characteristics.Select(c => new EventCharacteristicResponse(
                c.Id,
                c.Name,
                c.Value,
                c.DisplayOrder
            )).ToList(),
            @event.Photos.Select(p => new EventPhotoResponse(
                p.Id,
                p.PhotoUrl,
                p.DisplayOrder,
                p.UploadedAt
            )).ToList()
        );
    }
}

