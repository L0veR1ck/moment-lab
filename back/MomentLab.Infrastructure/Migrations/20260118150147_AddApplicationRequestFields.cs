using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MomentLab.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddApplicationRequestFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AttachedFileName",
                table: "application_requests",
                type: "character varying(500)",
                maxLength: 500,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ClientEmail",
                table: "application_requests",
                type: "character varying(200)",
                maxLength: 200,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ClientWishes",
                table: "application_requests",
                type: "character varying(2000)",
                maxLength: 2000,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AttachedFileName",
                table: "application_requests");

            migrationBuilder.DropColumn(
                name: "ClientEmail",
                table: "application_requests");

            migrationBuilder.DropColumn(
                name: "ClientWishes",
                table: "application_requests");
        }
    }
}
