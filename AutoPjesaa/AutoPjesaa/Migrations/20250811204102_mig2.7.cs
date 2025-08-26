using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AutoPjesaa.Migrations
{
    /// <inheritdoc />
    public partial class mig27 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Content",
                table: "Blogs",
                newName: "photoUrl");

            migrationBuilder.AddColumn<string>(
                name: "description",
                table: "Blogs",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "description",
                table: "Blogs");

            migrationBuilder.RenameColumn(
                name: "photoUrl",
                table: "Blogs",
                newName: "Content");
        }
    }
}
