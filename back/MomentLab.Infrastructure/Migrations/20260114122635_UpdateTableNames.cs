using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MomentLab.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class UpdateTableNames : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "events",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Title = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    Description = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: false),
                    ProgramDescription = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: false),
                    KeyValues = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: false),
                    MainPhotoUrl = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    DisplayOrder = table.Column<int>(type: "integer", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_events", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "reviews",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    ClientName = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    ReviewText = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: false),
                    IsApproved = table.Column<bool>(type: "boolean", nullable: false),
                    Rating = table.Column<int>(type: "integer", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_reviews", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "team_members",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    FirstName = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    LastName = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Position = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    PhotoUrl = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    PhoneNumber = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    Wishes = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    AttachmentUrl = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    DisplayOrder = table.Column<int>(type: "integer", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_team_members", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "event_characteristics",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    EventId = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Value = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    DisplayOrder = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_event_characteristics", x => x.Id);
                    table.ForeignKey(
                        name: "FK_event_characteristics_events_EventId",
                        column: x => x.EventId,
                        principalTable: "events",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "event_photos",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    EventId = table.Column<Guid>(type: "uuid", nullable: false),
                    PhotoUrl = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    DisplayOrder = table.Column<int>(type: "integer", nullable: false),
                    UploadedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_event_photos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_event_photos_events_EventId",
                        column: x => x.EventId,
                        principalTable: "events",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_event_characteristics_EventId",
                table: "event_characteristics",
                column: "EventId");

            migrationBuilder.CreateIndex(
                name: "IX_event_photos_EventId",
                table: "event_photos",
                column: "EventId");

            migrationBuilder.CreateIndex(
                name: "IX_events_DisplayOrder",
                table: "events",
                column: "DisplayOrder");

            migrationBuilder.CreateIndex(
                name: "IX_events_IsActive",
                table: "events",
                column: "IsActive");

            migrationBuilder.CreateIndex(
                name: "IX_reviews_CreatedAt",
                table: "reviews",
                column: "CreatedAt");

            migrationBuilder.CreateIndex(
                name: "IX_reviews_IsApproved",
                table: "reviews",
                column: "IsApproved");

            migrationBuilder.CreateIndex(
                name: "IX_team_members_DisplayOrder",
                table: "team_members",
                column: "DisplayOrder");

            migrationBuilder.CreateIndex(
                name: "IX_team_members_IsActive",
                table: "team_members",
                column: "IsActive");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "event_characteristics");

            migrationBuilder.DropTable(
                name: "event_photos");

            migrationBuilder.DropTable(
                name: "reviews");

            migrationBuilder.DropTable(
                name: "team_members");

            migrationBuilder.DropTable(
                name: "events");
        }
    }
}
