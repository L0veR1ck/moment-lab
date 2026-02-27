using FluentValidation;
using MomentLab.Core.DTOs;

namespace MomentLab.Core.Validators;

public class EventRequestValidator : AbstractValidator<EventRequest>
{
    public EventRequestValidator()
    {
        RuleFor(x => x.Title)
            .NotEmpty().WithMessage("Title is required")
            .MaximumLength(200).WithMessage("Title must not exceed 200 characters");

        RuleFor(x => x.UrlSlug)
            .NotEmpty().WithMessage("URL slug is required")
            .MaximumLength(200).WithMessage("URL slug must not exceed 200 characters")
            .Matches("^[a-z0-9]+(?:-[a-z0-9]+)*$").WithMessage("URL slug must contain only lowercase letters, numbers and hyphens");

        RuleFor(x => x.Description)
            .NotEmpty().WithMessage("Description is required")
            .MaximumLength(2000).WithMessage("Description must not exceed 2000 characters");

        RuleFor(x => x.ProgramDescription)
            .MaximumLength(2000).WithMessage("Program description must not exceed 2000 characters")
            .When(x => !string.IsNullOrEmpty(x.ProgramDescription));

        RuleFor(x => x.KeyValues)
            .MaximumLength(2000).WithMessage("Key values must not exceed 2000 characters")
            .When(x => !string.IsNullOrEmpty(x.KeyValues));

        RuleFor(x => x.MainPhotoUrl)
            .MaximumLength(500).WithMessage("Main photo URL must not exceed 500 characters")
            .When(x => !string.IsNullOrEmpty(x.MainPhotoUrl));

        RuleFor(x => x.DisplayOrder)
            .GreaterThanOrEqualTo(0).WithMessage("Display order must be greater than or equal to 0");
    }
}



