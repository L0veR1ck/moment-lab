using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MomentLab.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class RemoveUnusedTeamFieldsAndSeedData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AttachmentUrl",
                table: "team_members");

            migrationBuilder.DropColumn(
                name: "PhoneNumber",
                table: "team_members");

            migrationBuilder.DropColumn(
                name: "Wishes",
                table: "team_members");

            // Seed team members
            var now = DateTime.UtcNow;
            
            var member1Id = Guid.NewGuid();
            migrationBuilder.InsertData(
                table: "team_members",
                columns: new[] { "Id", "FirstName", "LastName", "Position", "PhotoUrl", "IsActive", "DisplayOrder", "CreatedAt", "UpdatedAt" },
                values: new object[] 
                { 
                    member1Id,
                    "Анастасия",
                    "Сеченова",
                    "Стратег и вдохновитель",
                    "/uploads/team/team-1.jpg",
                    true,
                    0,
                    now,
                    now
                });

            var member2Id = Guid.NewGuid();
            migrationBuilder.InsertData(
                table: "team_members",
                columns: new[] { "Id", "FirstName", "LastName", "Position", "PhotoUrl", "IsActive", "DisplayOrder", "CreatedAt", "UpdatedAt" },
                values: new object[] 
                { 
                    member2Id,
                    "Андрей",
                    "Рябинин",
                    "Архитектор атмосферы",
                    "/uploads/team/team-2.jpg",
                    true,
                    1,
                    now,
                    now
                });

            var member3Id = Guid.NewGuid();
            migrationBuilder.InsertData(
                table: "team_members",
                columns: new[] { "Id", "FirstName", "LastName", "Position", "PhotoUrl", "IsActive", "DisplayOrder", "CreatedAt", "UpdatedAt" },
                values: new object[] 
                { 
                    member3Id,
                    "Катя",
                    "Кудашова",
                    "Мастер вовлечения",
                    "/uploads/team/team-3.jpg",
                    true,
                    2,
                    now,
                    now
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Remove seeded data
            migrationBuilder.Sql("DELETE FROM \"team_members\" WHERE \"FirstName\" IN ('Анастасия', 'Андрей', 'Катя')");

            migrationBuilder.AddColumn<string>(
                name: "AttachmentUrl",
                table: "team_members",
                type: "character varying(500)",
                maxLength: 500,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PhoneNumber",
                table: "team_members",
                type: "character varying(50)",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Wishes",
                table: "team_members",
                type: "character varying(1000)",
                maxLength: 1000,
                nullable: true);
        }
    }
}
