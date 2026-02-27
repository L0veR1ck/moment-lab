using Microsoft.AspNetCore.Mvc;
using MomentLab.Core.Interfaces;

namespace MomentLab.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FilesController(
    IFileStorageService fileStorageService,
    ILogger<FilesController> logger
) : ControllerBase
{
    [HttpPost("upload")]
    [Consumes("multipart/form-data")]
    public async Task<ActionResult<object>> UploadFile(IFormFile file, string? folder = "general")
    {
        try
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest(new { error = "No file provided" });
            }

            var fileUrl = await fileStorageService.UploadFileAsync(file, folder ?? "general");

            return Ok(new
            {
                success = true,
                fileUrl,
                fileName = file.FileName,
                fileSize = file.Length
            });
        }
        catch (ArgumentException ex)
        {
            logger.LogWarning(ex, "Invalid file upload attempt");
            return BadRequest(new { error = ex.Message });
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error uploading file");
            return StatusCode(500, new { error = "Internal server error" });
        }
    }

    [HttpDelete]
    public async Task<ActionResult> DeleteFile([FromQuery] string fileUrl)
    {
        try
        {
            if (string.IsNullOrWhiteSpace(fileUrl))
            {
                return BadRequest(new { error = "File URL is required" });
            }

            var result = await fileStorageService.DeleteFileAsync(fileUrl);

            if (result)
            {
                return Ok(new { success = true, message = "File deleted successfully" });
            }

            return NotFound(new { error = "File not found" });
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error deleting file {FileUrl}", fileUrl);
            return StatusCode(500, new { error = "Internal server error" });
        }
    }
}

