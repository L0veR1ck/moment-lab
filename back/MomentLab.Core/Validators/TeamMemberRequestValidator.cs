using FluentValidation;
using MomentLab.Core.DTOs;

namespace MomentLab.Core.Validators;

public class TeamMemberRequestValidator : AbstractValidator<TeamMemberRequest>
{
    public TeamMemberRequestValidator()
    {
        RuleFor(x => x.FirstName)
            .NotEmpty().WithMessage("First name is required")
            .MaximumLength(100).WithMessage("First name must not exceed 100 characters");

        RuleFor(x => x.LastName)
            .NotEmpty().WithMessage("Last name is required")
            .MaximumLength(100).WithMessage("Last name must not exceed 100 characters");

        RuleFor(x => x.Position)
            .MaximumLength(200).WithMessage("Position must not exceed 200 characters")
            .When(x => !string.IsNullOrEmpty(x.Position));

        RuleFor(x => x.PhotoUrl)
            .MaximumLength(500).WithMessage("Photo URL must not exceed 500 characters")
            .When(x => !string.IsNullOrEmpty(x.PhotoUrl));

        RuleFor(x => x.DisplayOrder)
            .GreaterThanOrEqualTo(0).WithMessage("Display order must be greater than or equal to 0");
    }
}



