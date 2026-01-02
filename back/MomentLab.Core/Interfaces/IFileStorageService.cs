using Microsoft.AspNetCore.Http;

namespace MomentLab.Core.Interfaces;

public interface IFileStorageService
{
    Task<string> UploadFileAsync(IFormFile file, string folder = "uploads");
    Task<bool> DeleteFileAsync(string fileUrl);
    string GetFileUrl(string fileName, string folder = "uploads");
}

