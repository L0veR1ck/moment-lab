using Microsoft.EntityFrameworkCore;
using MomentLab.Core.Entities;

namespace MomentLab.Infrastructure.Data;

public class ApplicationDbContext(
    DbContextOptions<ApplicationDbContext> options
) : DbContext(options)
{
    public DbSet<ApplicationRequest> ApplicationRequests { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<ApplicationRequest>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.ClientName).IsRequired().HasMaxLength(200);
            entity.Property(e => e.ClientPhone).IsRequired().HasMaxLength(50);
            entity.Property(e => e.RequestDate).IsRequired();
            entity.Property(e => e.Status).IsRequired();
            entity.Property(e => e.BitrixDealId).HasMaxLength(100);
            entity.Property(e => e.CreatedAt).IsRequired();
            entity.Property(e => e.UpdatedAt).IsRequired();

            entity.HasIndex(e => e.Status);
            entity.HasIndex(e => e.CreatedAt);
        });
    }
}
