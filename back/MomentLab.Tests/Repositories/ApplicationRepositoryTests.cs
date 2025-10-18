using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using MomentLab.Core.Entities;
using MomentLab.Core.Enums;
using MomentLab.Infrastructure.Data;
using MomentLab.Infrastructure.Repositories;

namespace MomentLab.Tests.Repositories;

public class ApplicationRepositoryTests : IDisposable
{
    private readonly ApplicationDbContext context;
    private readonly ApplicationRepository repository;

    public ApplicationRepositoryTests()
    {
        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;

        context = new ApplicationDbContext(options);
        repository = new ApplicationRepository(context);
    }

    [Fact]
    public async Task CreateAsync_Should_Create_Application_With_Generated_Id()
    {
        // Arrange
        var application = new ApplicationRequest
        {
            ClientName = "Тест Тестов",
            ClientPhone = "+7 (999) 123-45-67",
            RequestDate = DateTime.UtcNow,
            Status = ApplicationStatus.New
        };

        // Act
        var result = await repository.CreateAsync(application);

        // Assert
        result.Id.Should().NotBeEmpty();
        result.CreatedAt.Should().BeCloseTo(DateTime.UtcNow, TimeSpan.FromSeconds(1));
        result.UpdatedAt.Should().BeCloseTo(DateTime.UtcNow, TimeSpan.FromSeconds(1));
    }

    [Fact]
    public async Task GetByIdAsync_Should_Return_Application_When_Exists()
    {
        // Arrange
        var application = new ApplicationRequest
        {
            ClientName = "Тест Тестов",
            ClientPhone = "+7 (999) 123-45-67",
            RequestDate = DateTime.UtcNow,
            Status = ApplicationStatus.New
        };
        var created = await repository.CreateAsync(application);

        // Act
        var result = await repository.GetByIdAsync(created.Id);

        // Assert
        result.Should().NotBeNull();
        result.Id.Should().Be(created.Id);
        result.ClientName.Should().Be("Тест Тестов");
    }

    [Fact]
    public async Task GetByIdAsync_Should_Return_Null_When_Not_Exists()
    {
        // Act
        var result = await repository.GetByIdAsync(Guid.NewGuid());

        // Assert
        result.Should().BeNull();
    }

    [Fact]
    public async Task GetAllAsync_Should_Return_Paginated_Results()
    {
        // Arrange
        for (var i = 0; i < 15; i++)
        {
            await repository.CreateAsync(new ApplicationRequest
            {
                ClientName = $"Клиент {i}",
                ClientPhone = "+7 (999) 000-00-00",
                RequestDate = DateTime.UtcNow,
                Status = ApplicationStatus.New
            });
        }

        // Act
        var (items, totalCount) = await repository.GetAllAsync(page: 2, pageSize: 10);

        // Assert
        totalCount.Should().Be(15);
        items.Should().HaveCount(5); // Вторая страница: 5 элементов
    }

    [Fact]
    public async Task UpdateAsync_Should_Update_Application_And_UpdatedAt()
    {
        // Arrange
        var application = new ApplicationRequest
        {
            ClientName = "Тест Тестов",
            ClientPhone = "+7 (999) 123-45-67",
            RequestDate = DateTime.UtcNow,
            Status = ApplicationStatus.New
        };
        var created = await repository.CreateAsync(application);
        var originalUpdatedAt = created.UpdatedAt;

        await Task.Delay(10); // Небольшая задержка для разницы во времени

        // Act
        created.Status = ApplicationStatus.InProgress;
        var updated = await repository.UpdateAsync(created);

        // Assert
        updated.Status.Should().Be(ApplicationStatus.InProgress);
        updated.UpdatedAt.Should().BeAfter(originalUpdatedAt);
    }

    [Fact]
    public async Task GetUnprocessedApplicationsAsync_Should_Return_Only_New_Unprocessed()
    {
        // Arrange
        // Создаем обработанную заявку
        await repository.CreateAsync(new ApplicationRequest
        {
            ClientName = "Обработанная",
            ClientPhone = "+7 (999) 111-11-11",
            RequestDate = DateTime.UtcNow,
            Status = ApplicationStatus.New,
            IsTelegramNotificationSent = true,
            IsBitrixSent = true,
            IsEmailSent = true
        });

        // Создаем необработанную заявку
        await repository.CreateAsync(new ApplicationRequest
        {
            ClientName = "Необработанная",
            ClientPhone = "+7 (999) 222-22-22",
            RequestDate = DateTime.UtcNow,
            Status = ApplicationStatus.New,
            IsTelegramNotificationSent = false,
            IsBitrixSent = false,
            IsEmailSent = false
        });

        // Создаем заявку в другом статусе
        await repository.CreateAsync(new ApplicationRequest
        {
            ClientName = "В работе",
            ClientPhone = "+7 (999) 333-33-33",
            RequestDate = DateTime.UtcNow,
            Status = ApplicationStatus.InProgress
        });

        // Act
        var unprocessed = await repository.GetUnprocessedApplicationsAsync();

        // Assert
        unprocessed.Should().HaveCount(1);
        unprocessed.First().ClientName.Should().Be("Необработанная");
    }

    public void Dispose()
    {
        context.Database.EnsureDeleted();
        context.Dispose();
    }
}

