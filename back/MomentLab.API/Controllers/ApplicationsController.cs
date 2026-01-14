using Microsoft.AspNetCore.Mvc;
using MomentLab.API.Attributes;
using MomentLab.Core.DTOs;
using MomentLab.Core.Entities;
using MomentLab.Core.Enums;
using MomentLab.Core.Interfaces;

namespace MomentLab.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ApplicationsController(
    IApplicationRepository repository,
    ILogger<ApplicationsController> logger
) : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult<ApplicationResponse>> Create([FromBody] CreateApplicationRequest request)
    {
        try
        {
            var application = new ApplicationRequest
            {
                ClientName = request.ClientName,
                ClientPhone = request.ClientPhone,
                RequestDate = request.RequestDate.Kind == DateTimeKind.Utc 
                    ? request.RequestDate 
                    : DateTime.SpecifyKind(request.RequestDate, DateTimeKind.Utc),
                Status = (ApplicationStatus)request.Status,
                IsTelegramNotificationSent = false,
                IsBitrixSent = false,
                IsEmailSent = false
            };

            var created = await repository.CreateAsync(application);

            logger.LogInformation("Application created: {ApplicationId}", created.Id);

            var response = new ApplicationResponse(
                created.Id,
                created.ClientName,
                created.ClientPhone,
                created.RequestDate,
                created.Status,
                created.IsTelegramNotificationSent,
                created.IsBitrixSent,
                created.IsEmailSent,
                created.BitrixDealId,
                created.CreatedAt,
                created.UpdatedAt
            );

            return CreatedAtAction(nameof(GetById), new { id = created.Id }, response);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error creating application");
            return StatusCode(500, "Internal server error");
        }
    }

    [HttpGet]
    [AdminAuthorize]
    public async Task<ActionResult<object>> GetAll([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
    {
        try
        {
            if (page < 1)
            {
                page = 1;
            }

            if (pageSize < 1 || pageSize > 100)
            {
                pageSize = 10;
            }

            var (items, totalCount) = await repository.GetAllAsync(page, pageSize);

            var responses = items.Select(app => new ApplicationResponse(
                app.Id,
                app.ClientName,
                app.ClientPhone,
                app.RequestDate,
                app.Status,
                app.IsTelegramNotificationSent,
                app.IsBitrixSent,
                app.IsEmailSent,
                app.BitrixDealId,
                app.CreatedAt,
                app.UpdatedAt
            )).ToList();

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
            logger.LogError(ex, "Error getting applications");
            return StatusCode(500, "Internal server error");
        }
    }

    [HttpGet("{id:guid}")]
    [AdminAuthorize]
    public async Task<ActionResult<ApplicationResponse>> GetById(Guid id)
    {
        try
        {
            var application = await repository.GetByIdAsync(id);

            if (application == null)
                return NotFound();

            var response = new ApplicationResponse(
                application.Id,
                application.ClientName,
                application.ClientPhone,
                application.RequestDate,
                application.Status,
                application.IsTelegramNotificationSent,
                application.IsBitrixSent,
                application.IsEmailSent,
                application.BitrixDealId,
                application.CreatedAt,
                application.UpdatedAt
            );

            return Ok(response);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error getting application {ApplicationId}", id);
            return StatusCode(500, "Internal server error");
        }
    }

    [HttpPut("{id:guid}")]
    [AdminAuthorize]
    public async Task<ActionResult<ApplicationResponse>> Update(Guid id, [FromBody] UpdateApplicationRequest request)
    {
        try
        {
            var application = await repository.GetByIdAsync(id);

            if (application == null)
                return NotFound();

            application.ClientName = request.ClientName;
            application.ClientPhone = request.ClientPhone;
            application.RequestDate = request.RequestDate.Kind == DateTimeKind.Utc 
                ? request.RequestDate 
                : DateTime.SpecifyKind(request.RequestDate, DateTimeKind.Utc);
            application.Status = (ApplicationStatus)request.Status;

            var updated = await repository.UpdateAsync(application);

            logger.LogInformation("Application {ApplicationId} updated", id);

            var response = new ApplicationResponse(
                updated.Id,
                updated.ClientName,
                updated.ClientPhone,
                updated.RequestDate,
                updated.Status,
                updated.IsTelegramNotificationSent,
                updated.IsBitrixSent,
                updated.IsEmailSent,
                updated.BitrixDealId,
                updated.CreatedAt,
                updated.UpdatedAt
            );

            return Ok(response);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error updating application {ApplicationId}", id);
            return StatusCode(500, "Internal server error");
        }
    }

    [HttpPatch("{id:guid}/status")]
    [AdminAuthorize]
    public async Task<ActionResult<ApplicationResponse>> UpdateStatus(Guid id, [FromBody] UpdateStatusRequest request)
    {
        try
        {
            var application = await repository.GetByIdAsync(id);

            if (application == null)
                return NotFound();

            application.Status = request.Status;
            var updated = await repository.UpdateAsync(application);

            logger.LogInformation("Application {ApplicationId} status updated to {Status}", id, request.Status);

            var response = new ApplicationResponse(
                updated.Id,
                updated.ClientName,
                updated.ClientPhone,
                updated.RequestDate,
                updated.Status,
                updated.IsTelegramNotificationSent,
                updated.IsBitrixSent,
                updated.IsEmailSent,
                updated.BitrixDealId,
                updated.CreatedAt,
                updated.UpdatedAt
            );

            return Ok(response);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error updating application status {ApplicationId}", id);
            return StatusCode(500, "Internal server error");
        }
    }
}
