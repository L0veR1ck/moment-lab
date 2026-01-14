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

        RuleFor(x => x.PhoneNumber)
            .MaximumLength(50).WithMessage("Phone number must not exceed 50 characters")
            .When(x => !string.IsNullOrEmpty(x.PhoneNumber));

        RuleFor(x => x.Wishes)
            .MaximumLength(1000).WithMessage("Wishes must not exceed 1000 characters")
            .When(x => !string.IsNullOrEmpty(x.Wishes));

        RuleFor(x => x.PhotoUrl)
            .MaximumLength(500).WithMessage("Photo URL must not exceed 500 characters")
            .When(x => !string.IsNullOrEmpty(x.PhotoUrl));

        RuleFor(x => x.AttachmentUrl)
            .MaximumLength(500).WithMessage("Attachment URL must not exceed 500 characters")
            .When(x => !string.IsNullOrEmpty(x.AttachmentUrl));

        RuleFor(x => x.DisplayOrder)
            .GreaterThanOrEqualTo(0).WithMessage("Display order must be greater than or equal to 0");
    }
}



