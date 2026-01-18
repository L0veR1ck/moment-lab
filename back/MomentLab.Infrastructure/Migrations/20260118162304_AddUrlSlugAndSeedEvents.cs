using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MomentLab.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddUrlSlugAndSeedEvents : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UrlSlug",
                table: "events",
                type: "text",
                nullable: false,
                defaultValue: "");

            // Create unique index on UrlSlug
            migrationBuilder.CreateIndex(
                name: "IX_Events_UrlSlug",
                table: "events",
                column: "UrlSlug",
                unique: true);

            // Seed Active Team Building event
            var activeTeamBuildingId = Guid.NewGuid();
            var now = DateTime.UtcNow;
            
            migrationBuilder.InsertData(
                table: "events",
                columns: new[] { "Id", "Title", "UrlSlug", "Description", "ProgramDescription", "KeyValues", "MainPhotoUrl", "IsActive", "DisplayOrder", "CreatedAt", "UpdatedAt" },
                values: new object[] 
                { 
                    activeTeamBuildingId,
                    "Активное командообразование",
                    "active-team-building",
                    "Динамичный тренинг по активному командообразованию для одного или нескольких классов.",
                    @"Что входит в программу?

• Профессиональная команда: ведущий и хелперы.
• Масштабируемый формат для разного числа участников.
• Интерактивные задания на взаимодействие и лидерство.
• Индивидуальный сценарий под ваш запрос.

Динамичный тренинг по активному командообразованию для одного или нескольких классов. Цель — сплотить коллектив через энергичные игры и совместные задачи. Программа адаптируется под ваши цели, с возможностью участия родителей. Тренинг проходит в игровой форме.",
                    @"Цель — сплотить коллектив через энергичные игры и совместные задачи. Программа адаптируется под ваши цели, с возможностью участия родителей.",
                    "/src/assets/active-team-building/active-team-building-1.jpg",
                    true,
                    0,
                    now,
                    now
                });

            // Add characteristics for Active Team Building
            migrationBuilder.InsertData(
                table: "event_characteristics",
                columns: new[] { "Id", "EventId", "Name", "Value", "DisplayOrder" },
                values: new object[,]
                {
                    { Guid.NewGuid(), activeTeamBuildingId, "Участников", "до 100", 0 },
                    { Guid.NewGuid(), activeTeamBuildingId, "Длительность мероприятия", "1,5 часа", 1 }
                });

            // Seed Trainings event
            var trainingsId = Guid.NewGuid();
            
            migrationBuilder.InsertData(
                table: "events",
                columns: new[] { "Id", "Title", "UrlSlug", "Description", "ProgramDescription", "KeyValues", "MainPhotoUrl", "IsActive", "DisplayOrder", "CreatedAt", "UpdatedAt" },
                values: new object[] 
                { 
                    trainingsId,
                    "Тренинги",
                    "trainings",
                    "Специальный тренинг для вашего класса, лидерство, командообразование, профориентация, опишите ваш запрос, а мы составим программу, специально для вас.",
                    @"Что входит в программу?

• Профессиональная команда: ведущий и хелперы.
• Масштабируемый формат для разного числа участников.
• Индивидуальный сценарий под ваш запрос.

Специальный тренинг для вашего класса, лидерство, командообразование, профориентация, опишите ваш запрос, а мы составим программу, специально для вас.",
                    @"Программа адаптируется под ваши цели: лидерство, командообразование, профориентация и многое другое.",
                    "/src/assets/training/training-4.jpg",
                    true,
                    1,
                    now,
                    now
                });

            // Add characteristics for Trainings
            migrationBuilder.InsertData(
                table: "event_characteristics",
                columns: new[] { "Id", "EventId", "Name", "Value", "DisplayOrder" },
                values: new object[,]
                {
                    { Guid.NewGuid(), trainingsId, "Участников", "до 100", 0 },
                    { Guid.NewGuid(), trainingsId, "Длительность мероприятия", "1,5 часа", 1 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Remove seeded data (cascading will remove characteristics)
            migrationBuilder.Sql("DELETE FROM \"events\" WHERE \"UrlSlug\" IN ('active-team-building', 'trainings')");

            // Drop index
            migrationBuilder.DropIndex(
                name: "IX_Events_UrlSlug",
                table: "events");

            migrationBuilder.DropColumn(
                name: "UrlSlug",
                table: "events");
        }
    }
}
