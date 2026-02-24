using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MomentLab.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddPortfolioTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "portfolio_projects",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Title = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    DisplayOrder = table.Column<int>(type: "integer", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_portfolio_projects", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "portfolio_photos",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    ProjectId = table.Column<Guid>(type: "uuid", nullable: false),
                    PhotoUrl = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    DisplayOrder = table.Column<int>(type: "integer", nullable: false),
                    UploadedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_portfolio_photos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_portfolio_photos_portfolio_projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "portfolio_projects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_portfolio_photos_ProjectId",
                table: "portfolio_photos",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_portfolio_projects_DisplayOrder",
                table: "portfolio_projects",
                column: "DisplayOrder");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "portfolio_photos");

            migrationBuilder.DropTable(
                name: "portfolio_projects");
        }
    }
}
