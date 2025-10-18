using FluentValidation;
using MomentLab.Core.DTOs;

namespace MomentLab.Core.Validators;

public class CreateApplicationRequestValidator : AbstractValidator<CreateApplicationRequest>
{
    public CreateApplicationRequestValidator()
    {
        RuleFor(x => x.ClientName)
            .NotEmpty().WithMessage("Client name is required")
            .MaximumLength(200).WithMessage("Client name must not exceed 200 characters");

        RuleFor(x => x.ClientPhone)
            .NotEmpty().WithMessage("Client phone is required")
            .MaximumLength(50).WithMessage("Phone must not exceed 50 characters")
            .Matches(@"^[\d\s\+\-\(\)]+$").WithMessage("Phone number contains invalid characters");

        RuleFor(x => x.RequestDate)
            .NotEmpty().WithMessage("Request date is required");
    }
}

