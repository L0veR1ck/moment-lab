using FluentAssertions;
using MomentLab.Core.DTOs;
using MomentLab.Core.Validators;

namespace MomentLab.Tests.Validators;

public class CreateApplicationRequestValidatorTests
{
    private readonly CreateApplicationRequestValidator validator = new();

    [Fact]
    public void Should_Pass_When_Valid_Request()
    {
        // Arrange
        var request = new CreateApplicationRequest(
            "Иван Иванов",
            "+7 (999) 123-45-67",
            DateTime.UtcNow.AddDays(7)
        );

        // Act
        var result = validator.Validate(request);

        // Assert
        result.IsValid.Should().BeTrue();
    }

    [Theory]
    [InlineData("")]
    [InlineData(null)]
    public void Should_Fail_When_ClientName_Is_Empty(string? clientName)
    {
        // Arrange
        var request = new CreateApplicationRequest(
            clientName!,
            "+7 (999) 123-45-67",
            DateTime.UtcNow
        );

        // Act
        var result = validator.Validate(request);

        // Assert
        result.IsValid.Should().BeFalse();
        result.Errors.Should().Contain(e => e.PropertyName == "ClientName");
    }

    [Fact]
    public void Should_Fail_When_ClientName_Exceeds_MaxLength()
    {
        // Arrange
        var request = new CreateApplicationRequest(
            new string('A', 201), // 201 символ
            "+7 (999) 123-45-67",
            DateTime.UtcNow
        );

        // Act
        var result = validator.Validate(request);

        // Assert
        result.IsValid.Should().BeFalse();
        result.Errors.Should().Contain(e => e.PropertyName == "ClientName");
    }

    [Theory]
    [InlineData("")]
    [InlineData(null)]
    public void Should_Fail_When_ClientPhone_Is_Empty(string? clientPhone)
    {
        // Arrange
        var request = new CreateApplicationRequest(
            "Иван Иванов",
            clientPhone!,
            DateTime.UtcNow
        );

        // Act
        var result = validator.Validate(request);

        // Assert
        result.IsValid.Should().BeFalse();
        result.Errors.Should().Contain(e => e.PropertyName == "ClientPhone");
    }

    [Theory]
    [InlineData("+7 (999) 123-45-67")]
    [InlineData("89991234567")]
    [InlineData("+1-555-555-5555")]
    [InlineData("8 (999) 123 45 67")]
    public void Should_Pass_When_ClientPhone_Is_Valid_Format(string clientPhone)
    {
        // Arrange
        var request = new CreateApplicationRequest(
            "Иван Иванов",
            clientPhone,
            DateTime.UtcNow
        );

        // Act
        var result = validator.Validate(request);

        // Assert
        result.IsValid.Should().BeTrue();
    }

    [Theory]
    [InlineData("abc123")]
    [InlineData("телефон")]
    [InlineData("phone@number")]
    public void Should_Fail_When_ClientPhone_Contains_Invalid_Characters(string clientPhone)
    {
        // Arrange
        var request = new CreateApplicationRequest(
            "Иван Иванов",
            clientPhone,
            DateTime.UtcNow
        );

        // Act
        var result = validator.Validate(request);

        // Assert
        result.IsValid.Should().BeFalse();
        result.Errors.Should().Contain(e => e.PropertyName == "ClientPhone");
    }
}

