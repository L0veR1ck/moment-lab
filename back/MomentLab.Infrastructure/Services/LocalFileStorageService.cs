using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using MomentLab.Core.Interfaces;

namespace MomentLab.Infrastructure.Services;

public class LocalFileStorageService : IFileStorageService
{
    private readonly string _uploadPath;
    private readonly string _baseUrl;
    private readonly ILogger<LocalFileStorageService> _logger;

    public LocalFileStorageService(
        IConfiguration configuration,
        ILogger<LocalFileStorageService> logger)
    {
        _logger = logger;
        _uploadPath = configuration["FileStorage:UploadPath"] ?? "wwwroot/uploads";
        _baseUrl = configuration["FileStorage:BaseUrl"] ?? "/uploads";
        
        if (!Directory.Exists(_uploadPath))
        {
            Directory.CreateDirectory(_uploadPath);
            _logger.LogInformation("Created upload directory: {UploadPath}", _uploadPath);
        }
    }

    public async Task<string> UploadFileAsync(IFormFile file, string folder = "uploads")
    {
        if (file == null || file.Length == 0)
        {
            throw new ArgumentException("File is empty or null", nameof(file));
        }

        const long maxFileSize = 10 * 1024 * 1024;
        if (file.Length > maxFileSize)
        {
            throw new ArgumentException($"File size exceeds maximum allowed size of {maxFileSize} bytes", nameof(file));
        }

        var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif", ".webp", ".pdf", ".doc", ".docx" };
        var extension = Path.GetExtension(file.FileName).ToLowerInvariant();
        if (!allowedExtensions.Contains(extension))
        {
            throw new ArgumentException($"File extension {extension} is not allowed", nameof(file));
        }

        try
        {
            var folderPath = Path.Combine(_uploadPath, folder);
            if (!Directory.Exists(folderPath))
            {
                Directory.CreateDirectory(folderPath);
            }

            var fileName = $"{Guid.NewGuid()}{extension}";
            var filePath = Path.Combine(folderPath, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            var fileUrl = GetFileUrl(fileName, folder);
            _logger.LogInformation("File uploaded successfully: {FileUrl}", fileUrl);

            return fileUrl;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error uploading file {FileName}", file.FileName);
            throw;
        }
    }

    public Task<bool> DeleteFileAsync(string fileUrl)
    {
        try
        {
            var relativePath = fileUrl.Replace(_baseUrl, "").TrimStart('/');
            var filePath = Path.Combine(_uploadPath, relativePath);

            if (File.Exists(filePath))
            {
                File.Delete(filePath);
                _logger.LogInformation("File deleted successfully: {FileUrl}", fileUrl);
                return Task.FromResult(true);
            }

            _logger.LogWarning("File not found: {FileUrl}", fileUrl);
            return Task.FromResult(false);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting file {FileUrl}", fileUrl);
            return Task.FromResult(false);
        }
    }

    public string GetFileUrl(string fileName, string folder = "uploads")
    {
        return $"{_baseUrl}/{folder}/{fileName}";
    }
}

