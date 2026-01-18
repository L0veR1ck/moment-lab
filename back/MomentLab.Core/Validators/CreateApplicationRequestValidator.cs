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

        RuleFor(x => x.ClientEmail)
            .EmailAddress().When(x => !string.IsNullOrEmpty(x.ClientEmail))
            .WithMessage("Invalid email format")
            .MaximumLength(200).When(x => !string.IsNullOrEmpty(x.ClientEmail))
            .WithMessage("Email must not exceed 200 characters");

        RuleFor(x => x.ClientPhone)
            .NotEmpty().WithMessage("Client phone is required")
            .MaximumLength(50).WithMessage("Phone must not exceed 50 characters")
            .Matches(@"^[\d\s\+\-\(\)]+$").WithMessage("Phone number contains invalid characters");

        RuleFor(x => x.ClientWishes)
            .MaximumLength(2000).When(x => !string.IsNullOrEmpty(x.ClientWishes))
            .WithMessage("Wishes must not exceed 2000 characters");

        RuleFor(x => x.AttachedFileName)
            .MaximumLength(500).When(x => !string.IsNullOrEmpty(x.AttachedFileName))
            .WithMessage("File name must not exceed 500 characters");

        RuleFor(x => x.AttachedFileUrl)
            .MaximumLength(1000).When(x => !string.IsNullOrEmpty(x.AttachedFileUrl))
            .WithMessage("File URL must not exceed 1000 characters");
    }
}

