using System.Net;
using FluentAssertions;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using MomentLab.Core.Entities;
using MomentLab.Core.Enums;
using MomentLab.Infrastructure.Services;
using Moq;
using Moq.Protected;

namespace MomentLab.Tests.Services;

public class BitrixServiceTests
{
    private readonly Mock<HttpMessageHandler> httpMessageHandlerMock;
    private readonly HttpClient httpClient;
    private readonly Mock<IConfiguration> configurationMock;
    private readonly Mock<ILogger<BitrixService>> loggerMock;

    public BitrixServiceTests()
    {
        httpMessageHandlerMock = new Mock<HttpMessageHandler>();
        httpClient = new HttpClient(httpMessageHandlerMock.Object);

        configurationMock = new Mock<IConfiguration>();
        configurationMock.Setup(c => c["BitrixSettings:WebhookUrl"]).Returns("https://test.bitrix24.ru/rest/1/test");
        configurationMock.Setup(c => c["BitrixSettings:UserId"]).Returns("1");

        loggerMock = new Mock<ILogger<BitrixService>>();
    }

    [Fact]
    public async Task CreateDealAsync_Should_Return_DealId_When_Successful()
    {
        // Arrange
        var application = new ApplicationRequest
        {
            Id = Guid.NewGuid(),
            ClientName = "Иван Иванов",
            ClientPhone = "+7 (999) 123-45-67",
            RequestDate = DateTime.UtcNow,
            Status = ApplicationStatus.New
        };

        var responseContent = "{\"Result\":123}";

        httpMessageHandlerMock
            .Protected()
            .Setup<Task<HttpResponseMessage>>(
                "SendAsync",
                ItExpr.IsAny<HttpRequestMessage>(),
                ItExpr.IsAny<CancellationToken>()
            )
            .ReturnsAsync(new HttpResponseMessage
            {
                StatusCode = HttpStatusCode.OK,
                Content = new StringContent(responseContent)
            });

        var service = new BitrixService(httpClient, configurationMock.Object, loggerMock.Object);

        // Act
        var result = await service.CreateDealAsync(application);

        // Assert
        result.Should().Be("123");
    }

    [Fact]
    public async Task CreateDealAsync_Should_Return_Null_When_Request_Fails()
    {
        // Arrange
        var application = new ApplicationRequest
        {
            Id = Guid.NewGuid(),
            ClientName = "Иван Иванов",
            ClientPhone = "+7 (999) 123-45-67",
            RequestDate = DateTime.UtcNow,
            Status = ApplicationStatus.New
        };

        httpMessageHandlerMock
            .Protected()
            .Setup<Task<HttpResponseMessage>>(
                "SendAsync",
                ItExpr.IsAny<HttpRequestMessage>(),
                ItExpr.IsAny<CancellationToken>()
            )
            .ReturnsAsync(new HttpResponseMessage
            {
                StatusCode = HttpStatusCode.BadRequest
            });

        var service = new BitrixService(httpClient, configurationMock.Object, loggerMock.Object);

        // Act
        var result = await service.CreateDealAsync(application);

        // Assert
        result.Should().BeNull();
    }
}
