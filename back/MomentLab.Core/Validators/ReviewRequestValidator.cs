using FluentValidation;
using MomentLab.Core.DTOs;

namespace MomentLab.Core.Validators;

public class ReviewRequestValidator : AbstractValidator<ReviewRequest>
{
    public ReviewRequestValidator()
    {
        RuleFor(x => x.ClientName)
            .NotEmpty().WithMessage("Client name is required")
            .MaximumLength(200).WithMessage("Client name must not exceed 200 characters");

        RuleFor(x => x.ReviewText)
            .NotEmpty().WithMessage("Review text is required")
            .MaximumLength(2000).WithMessage("Review text must not exceed 2000 characters");

        RuleFor(x => x.Rating)
            .InclusiveBetween(1, 5).WithMessage("Rating must be between 1 and 5");
    }
}



