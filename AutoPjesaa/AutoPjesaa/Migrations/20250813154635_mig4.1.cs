using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AutoPjesaa.Migrations
{
    /// <inheritdoc />
    public partial class mig41 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "expireddiscount",
                table: "Stocks",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "expireddiscount",
                table: "Stocks");
        }
    }
}
