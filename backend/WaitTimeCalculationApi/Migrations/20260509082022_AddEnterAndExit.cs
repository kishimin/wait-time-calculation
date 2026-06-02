using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WaitTimeCalculationApi.Migrations
{
    /// <inheritdoc />
    public partial class AddEnterAndExit : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "EnteredAt",
                table: "LineEntries",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "ExitedAt",
                table: "LineEntries",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EnteredAt",
                table: "LineEntries");

            migrationBuilder.DropColumn(
                name: "ExitedAt",
                table: "LineEntries");
        }
    }
}
