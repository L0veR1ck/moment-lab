# Build stage
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copy solution and project files
COPY MomentLab.sln .
COPY MomentLab.API/MomentLab.API.csproj MomentLab.API/
COPY MomentLab.Core/MomentLab.Core.csproj MomentLab.Core/
COPY MomentLab.Infrastructure/MomentLab.Infrastructure.csproj MomentLab.Infrastructure/

# Restore dependencies
RUN dotnet restore MomentLab.API/MomentLab.API.csproj

# Copy all source code
COPY . .

# Build and publish
WORKDIR /src/MomentLab.API
RUN dotnet publish -c Release -o /app/publish /p:UseAppHost=false

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app

# Install curl for healthcheck
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# Copy published files
COPY --from=build /app/publish .

# Create logs directory
RUN mkdir -p /app/logs && chmod 777 /app/logs

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD curl -f http://localhost:8080/health || exit 1

# Run the application
ENTRYPOINT ["dotnet", "MomentLab.API.dll"]

