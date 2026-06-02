using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WaitTimeCalculationApi.Migrations
{
    /// <inheritdoc />
    public partial class ChangeKey : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_LineEntries",
                table: "LineEntries");

            migrationBuilder.AddPrimaryKey(
                name: "PK_LineEntries",
                table: "LineEntries",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_LineEntries_UserId",
                table: "LineEntries",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_LineEntries",
                table: "LineEntries");

            migrationBuilder.DropIndex(
                name: "IX_LineEntries_UserId",
                table: "LineEntries");

            migrationBuilder.AddPrimaryKey(
                name: "PK_LineEntries",
                table: "LineEntries",
                columns: new[] { "UserId", "LineId" });
        }
    }
}
