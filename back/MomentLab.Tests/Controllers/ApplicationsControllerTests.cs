using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MomentLab.API.Controllers;
using MomentLab.Core.DTOs;
using MomentLab.Core.Entities;
using MomentLab.Core.Enums;
using MomentLab.Core.Interfaces;
using Moq;

namespace MomentLab.Tests.Controllers;

public class ApplicationsControllerTests
{
    private readonly Mock<IApplicationRepository> repositoryMock;
    private readonly Mock<ILogger<ApplicationsController>> loggerMock;
    private readonly ApplicationsController controller;

    public ApplicationsControllerTests()
    {
        repositoryMock = new Mock<IApplicationRepository>();
        loggerMock = new Mock<ILogger<ApplicationsController>>();
        controller = new ApplicationsController(repositoryMock.Object, loggerMock.Object);
    }

    [Fact]
    public async Task Create_Should_Return_CreatedAtAction_With_Application()
    {
        // Arrange
        var request = new CreateApplicationRequest(
            "Тест Тестов",
            "+7 (999) 123-45-67",
            DateTime.UtcNow.AddDays(7)
        );

        var createdApplication = new ApplicationRequest
        {
            Id = Guid.NewGuid(),
            ClientName = request.ClientName,
            ClientPhone = request.ClientPhone,
            RequestDate = request.RequestDate,
            Status = ApplicationStatus.New,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        repositoryMock.Setup(r => r.CreateAsync(It.IsAny<ApplicationRequest>()))
            .ReturnsAsync(createdApplication);

        // Act
        var result = await controller.Create(request);

        // Assert
        result.Result.Should().BeOfType<CreatedAtActionResult>();
        var createdResult = result.Result as CreatedAtActionResult;
        createdResult!.Value.Should().BeOfType<ApplicationResponse>();
        
        var response = createdResult.Value as ApplicationResponse;
        response!.ClientName.Should().Be("Тест Тестов");
    }

    [Fact]
    public async Task GetById_Should_Return_Ok_With_Application_When_Exists()
    {
        // Arrange
        var applicationId = Guid.NewGuid();
        var application = new ApplicationRequest
        {
            Id = applicationId,
            ClientName = "Тест Тестов",
            ClientPhone = "+7 (999) 123-45-67",
            RequestDate = DateTime.UtcNow,
            Status = ApplicationStatus.New,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        repositoryMock.Setup(r => r.GetByIdAsync(applicationId))
            .ReturnsAsync(application);

        // Act
        var result = await controller.GetById(applicationId);

        // Assert
        result.Result.Should().BeOfType<OkObjectResult>();
        var okResult = result.Result as OkObjectResult;
        okResult!.Value.Should().BeOfType<ApplicationResponse>();
    }

    [Fact]
    public async Task GetById_Should_Return_NotFound_When_Not_Exists()
    {
        // Arrange
        var applicationId = Guid.NewGuid();
        repositoryMock.Setup(r => r.GetByIdAsync(applicationId))
            .ReturnsAsync((ApplicationRequest?)null);

        // Act
        var result = await controller.GetById(applicationId);

        // Assert
        result.Result.Should().BeOfType<NotFoundResult>();
    }

    [Fact]
    public async Task GetAll_Should_Return_Paginated_Results()
    {
        // Arrange
        var applications = new List<ApplicationRequest>
        {
            new() {
                Id = Guid.NewGuid(),
                ClientName = "Клиент 1",
                ClientPhone = "+7 (999) 111-11-11",
                RequestDate = DateTime.UtcNow,
                Status = ApplicationStatus.New,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            },
            new() {
                Id = Guid.NewGuid(),
                ClientName = "Клиент 2",
                ClientPhone = "+7 (999) 222-22-22",
                RequestDate = DateTime.UtcNow,
                Status = ApplicationStatus.New,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            }
        };

        repositoryMock.Setup(r => r.GetAllAsync(1, 10))
            .ReturnsAsync((applications, 2));

        // Act
        var result = await controller.GetAll();

        // Assert
        result.Result.Should().BeOfType<OkObjectResult>();
    }

    [Fact]
    public async Task UpdateStatus_Should_Return_Ok_When_Application_Exists()
    {
        // Arrange
        var applicationId = Guid.NewGuid();
        var application = new ApplicationRequest
        {
            Id = applicationId,
            ClientName = "Тест Тестов",
            ClientPhone = "+7 (999) 123-45-67",
            RequestDate = DateTime.UtcNow,
            Status = ApplicationStatus.New,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        repositoryMock.Setup(r => r.GetByIdAsync(applicationId))
            .ReturnsAsync(application);
        
        repositoryMock.Setup(r => r.UpdateAsync(It.IsAny<ApplicationRequest>()))
            .ReturnsAsync(application);

        var request = new UpdateStatusRequest(ApplicationStatus.InProgress);

        // Act
        var result = await controller.UpdateStatus(applicationId, request);

        // Assert
        result.Result.Should().BeOfType<OkObjectResult>();
    }

    [Fact]
    public async Task UpdateStatus_Should_Return_NotFound_When_Application_Not_Exists()
    {
        // Arrange
        var applicationId = Guid.NewGuid();
        repositoryMock.Setup(r => r.GetByIdAsync(applicationId))
            .ReturnsAsync((ApplicationRequest?)null);

        var request = new UpdateStatusRequest(ApplicationStatus.InProgress);

        // Act
        var result = await controller.UpdateStatus(applicationId, request);

        // Assert
        result.Result.Should().BeOfType<NotFoundResult>();
    }
}

