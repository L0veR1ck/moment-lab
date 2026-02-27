using Microsoft.EntityFrameworkCore;
using MomentLab.Core.Entities;

namespace MomentLab.Infrastructure.Data;

public class ApplicationDbContext(
    DbContextOptions<ApplicationDbContext> options
) : DbContext(options)
{
    public DbSet<ApplicationRequest> ApplicationRequests { get; set; }
    public DbSet<Event> Events { get; set; }
    public DbSet<EventCharacteristic> EventCharacteristics { get; set; }
    public DbSet<EventPhoto> EventPhotos { get; set; }
    public DbSet<Review> Reviews { get; set; }
    public DbSet<TeamMember> TeamMembers { get; set; }
    public DbSet<NotificationSettings> NotificationSettings { get; set; }
    public DbSet<PortfolioProject> PortfolioProjects { get; set; }
    public DbSet<PortfolioPhoto> PortfolioPhotos { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<ApplicationRequest>(entity =>
        {
            entity.ToTable("application_requests");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.ClientName).IsRequired().HasMaxLength(200);
            entity.Property(e => e.ClientEmail).HasMaxLength(200);
            entity.Property(e => e.ClientPhone).IsRequired().HasMaxLength(50);
            entity.Property(e => e.ClientWishes).HasMaxLength(2000);
            entity.Property(e => e.AttachedFileName).HasMaxLength(500);
            entity.Property(e => e.AttachedFileUrl).HasMaxLength(1000);
            entity.Property(e => e.RequestDate).IsRequired();
            entity.Property(e => e.Status).IsRequired();
            entity.Property(e => e.BitrixDealId).HasMaxLength(100);
            entity.Property(e => e.CreatedAt).IsRequired();
            entity.Property(e => e.UpdatedAt).IsRequired();

            entity.HasIndex(e => e.Status);
            entity.HasIndex(e => e.CreatedAt);
        });

        modelBuilder.Entity<Event>(entity =>
        {
            entity.ToTable("events");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Title).IsRequired().HasMaxLength(200);
            entity.Property(e => e.Description).IsRequired().HasMaxLength(2000);
            entity.Property(e => e.ProgramDescription).IsRequired().HasMaxLength(2000);
            entity.Property(e => e.KeyValues).IsRequired().HasMaxLength(2000);
            entity.Property(e => e.MainPhotoUrl).HasMaxLength(500);
            entity.Property(e => e.CreatedAt).IsRequired();
            entity.Property(e => e.UpdatedAt).IsRequired();

            entity.HasIndex(e => e.IsActive);
            entity.HasIndex(e => e.DisplayOrder);
            
            entity.HasMany(e => e.Characteristics)
                .WithOne(c => c.Event)
                .HasForeignKey(c => c.EventId)
                .OnDelete(DeleteBehavior.Cascade);
                
            entity.HasMany(e => e.Photos)
                .WithOne(p => p.Event)
                .HasForeignKey(p => p.EventId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<EventCharacteristic>(entity =>
        {
            entity.ToTable("event_characteristics");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
            entity.Property(e => e.Value).IsRequired().HasMaxLength(500);
            
            entity.HasIndex(e => e.EventId);
        });

        modelBuilder.Entity<EventPhoto>(entity =>
        {
            entity.ToTable("event_photos");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.PhotoUrl).IsRequired().HasMaxLength(500);
            entity.Property(e => e.UploadedAt).IsRequired();
            
            entity.HasIndex(e => e.EventId);
        });

        modelBuilder.Entity<Review>(entity =>
        {
            entity.ToTable("reviews");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.ClientName).IsRequired().HasMaxLength(200);
            entity.Property(e => e.ReviewText).IsRequired().HasMaxLength(2000);
            entity.Property(e => e.CreatedAt).IsRequired();
            entity.Property(e => e.UpdatedAt).IsRequired();
            
            entity.HasIndex(e => e.IsApproved);
            entity.HasIndex(e => e.CreatedAt);
        });

        modelBuilder.Entity<TeamMember>(entity =>
        {
            entity.ToTable("team_members");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.FirstName).IsRequired().HasMaxLength(100);
            entity.Property(e => e.LastName).IsRequired().HasMaxLength(100);
            entity.Property(e => e.Position).HasMaxLength(200);
            entity.Property(e => e.PhotoUrl).HasMaxLength(500);
            entity.Property(e => e.CreatedAt).IsRequired();
            entity.Property(e => e.UpdatedAt).IsRequired();
            
            entity.HasIndex(e => e.IsActive);
            entity.HasIndex(e => e.DisplayOrder);
        });

        modelBuilder.Entity<NotificationSettings>(entity =>
        {
            entity.ToTable("notification_settings");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.IsTelegramEnabled).IsRequired();
            entity.Property(e => e.IsEmailEnabled).IsRequired();
            entity.Property(e => e.IsBitrixEnabled).IsRequired();
            entity.Property(e => e.UpdatedAt).IsRequired();
        });

        modelBuilder.Entity<PortfolioProject>(entity =>
        {
            entity.ToTable("portfolio_projects");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Title).IsRequired().HasMaxLength(200);
            entity.Property(e => e.CreatedAt).IsRequired();
            entity.Property(e => e.UpdatedAt).IsRequired();

            entity.HasIndex(e => e.DisplayOrder);

            entity.HasMany(e => e.Photos)
                .WithOne(p => p.Project)
                .HasForeignKey(p => p.ProjectId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<PortfolioPhoto>(entity =>
        {
            entity.ToTable("portfolio_photos");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.PhotoUrl).IsRequired().HasMaxLength(500);
            entity.Property(e => e.UploadedAt).IsRequired();

            entity.HasIndex(e => e.ProjectId);
        });
    }
}
