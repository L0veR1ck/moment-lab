using Microsoft.AspNetCore.Mvc;
using MomentLab.Core.DTOs;
using MomentLab.Core.Entities;
using MomentLab.Core.Interfaces;

namespace MomentLab.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ReviewsController(
    IReviewRepository repository,
    ILogger<ReviewsController> logger
) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<object>> GetAll(
        [FromQuery] int page = 1, 
        [FromQuery] int pageSize = 10,
        [FromQuery] bool? isApproved = null)
    {
        try
        {
            if (page < 1) page = 1;
            if (pageSize < 1 || pageSize > 100) pageSize = 10;

            var (items, totalCount) = await repository.GetAllAsync(page, pageSize, isApproved);

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
            logger.LogError(ex, "Error getting reviews");
            return StatusCode(500, "Internal server error");
        }
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<ReviewResponse>> GetById(Guid id)
    {
        try
        {
            var review = await repository.GetByIdAsync(id);

            if (review == null)
                return NotFound();

            return Ok(MapToResponse(review));
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error getting review {ReviewId}", id);
            return StatusCode(500, "Internal server error");
        }
    }

    [HttpPost]
    public async Task<ActionResult<ReviewResponse>> Create([FromBody] ReviewRequest request)
    {
        try
        {
            var review = new Review
            {
                ClientName = request.ClientName,
                ReviewText = request.ReviewText,
                Rating = request.Rating
            };

            var created = await repository.CreateAsync(review);

            logger.LogInformation("Review created: {ReviewId}", created.Id);

            return CreatedAtAction(nameof(GetById), new { id = created.Id }, MapToResponse(created));
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error creating review");
            return StatusCode(500, "Internal server error");
        }
    }

    [HttpPut("{id:guid}")]
    public async Task<ActionResult<ReviewResponse>> Update(Guid id, [FromBody] ReviewRequest request)
    {
        try
        {
            var existing = await repository.GetByIdAsync(id);

            if (existing == null)
                return NotFound();

            existing.ClientName = request.ClientName;
            existing.ReviewText = request.ReviewText;
            existing.Rating = request.Rating;

            var updated = await repository.UpdateAsync(existing);

            logger.LogInformation("Review updated: {ReviewId}", id);

            return Ok(MapToResponse(updated));
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error updating review {ReviewId}", id);
            return StatusCode(500, "Internal server error");
        }
    }

    [HttpPatch("{id:guid}/approve")]
    public async Task<ActionResult<ReviewResponse>> Approve(Guid id)
    {
        try
        {
            var review = await repository.ApproveAsync(id);

            if (review == null)
                return NotFound();

            logger.LogInformation("Review approved: {ReviewId}", id);

            return Ok(MapToResponse(review));
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error approving review {ReviewId}", id);
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

            logger.LogInformation("Review deleted: {ReviewId}", id);

            return NoContent();
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error deleting review {ReviewId}", id);
            return StatusCode(500, "Internal server error");
        }
    }

    private static ReviewResponse MapToResponse(Review review)
    {
        return new ReviewResponse(
            review.Id,
            review.ClientName,
            review.ReviewText,
            review.IsApproved,
            review.Rating,
            review.CreatedAt,
            review.UpdatedAt
        );
    }
}

