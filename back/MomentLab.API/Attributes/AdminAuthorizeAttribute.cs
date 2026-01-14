using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace MomentLab.API.Attributes;

[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
public class AdminAuthorizeAttribute : Attribute, IAuthorizationFilter
{
    private const string ValidToken = "sperma";
    private const string BearerTokenCookieName = "admin_bearer_token";

    public void OnAuthorization(AuthorizationFilterContext context)
    {
        var token = context.HttpContext.Request.Cookies[BearerTokenCookieName];

        if (string.IsNullOrEmpty(token) || token != ValidToken)
        {
            context.Result = new UnauthorizedObjectResult(new { message = "Unauthorized" });
        }
    }
}
