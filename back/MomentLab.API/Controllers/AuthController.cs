using Microsoft.AspNetCore.Mvc;

namespace MomentLab.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController(ILogger<AuthController> logger) : ControllerBase
{
    private const string ValidToken = "sperma";
    private const string BearerTokenCookieName = "admin_bearer_token";

    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginRequest request)
    {
        try
        {
            if (string.IsNullOrEmpty(request.Token))
            {
                return BadRequest(new { message = "Token is required" });
            }

            if (request.Token != ValidToken)
            {
                logger.LogWarning("Failed login attempt with token: {Token}", request.Token);
                return Unauthorized(new { message = "Invalid token" });
            }

            // Генерируем Bearer токен (в данном случае просто используем валидный токен)
            var bearerToken = ValidToken;

            // Устанавливаем куку с Bearer токеном
            Response.Cookies.Append(BearerTokenCookieName, bearerToken, new CookieOptions
            {
                HttpOnly = true,
                Secure = false, // В продакшене должно быть true
                SameSite = SameSiteMode.Lax,
                MaxAge = TimeSpan.FromDays(30)
            });

            logger.LogInformation("Successful login");

            return Ok(new { message = "Login successful" });
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error during login");
            return StatusCode(500, "Internal server error");
        }
    }

    [HttpPost("logout")]
    public IActionResult Logout()
    {
        Response.Cookies.Delete(BearerTokenCookieName);
        logger.LogInformation("User logged out");
        return Ok(new { message = "Logout successful" });
    }

    [HttpGet("check")]
    public IActionResult CheckAuth()
    {
        var token = Request.Cookies[BearerTokenCookieName];
        
        if (string.IsNullOrEmpty(token) || token != ValidToken)
        {
            return Unauthorized(new { authenticated = false });
        }

        return Ok(new { authenticated = true });
    }
}

public record LoginRequest(string Token);
