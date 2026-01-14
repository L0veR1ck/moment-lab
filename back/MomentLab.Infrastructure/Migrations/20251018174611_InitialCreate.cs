#nullable disable

using Microsoft.EntityFrameworkCore.Migrations;

namespace MomentLab.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "application_requests",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    ClientName = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    ClientPhone = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    RequestDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    IsTelegramNotificationSent = table.Column<bool>(type: "boolean", nullable: false),
                    IsBitrixSent = table.Column<bool>(type: "boolean", nullable: false),
                    IsEmailSent = table.Column<bool>(type: "boolean", nullable: false),
                    BitrixDealId = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_application_requests", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_application_requests_CreatedAt",
                table: "application_requests",
                column: "CreatedAt");

            migrationBuilder.CreateIndex(
                name: "IX_application_requests_Status",
                table: "application_requests",
                column: "Status");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "application_requests");
        }
    }
}
