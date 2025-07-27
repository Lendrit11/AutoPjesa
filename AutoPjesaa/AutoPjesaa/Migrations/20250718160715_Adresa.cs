using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AutoPjesaa.Migrations
{
    /// <inheritdoc />
    public partial class Adresa : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AddressAppUser");

            migrationBuilder.CreateIndex(
                name: "IX_Addresses_UserId",
                table: "Addresses",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Addresses_AppUsers_UserId",
                table: "Addresses",
                column: "UserId",
                principalTable: "AppUsers",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Addresses_AppUsers_UserId",
                table: "Addresses");

            migrationBuilder.DropIndex(
                name: "IX_Addresses_UserId",
                table: "Addresses");

            migrationBuilder.CreateTable(
                name: "AddressAppUser",
                columns: table => new
                {
                    AddressesAdressId = table.Column<int>(type: "int", nullable: false),
                    UsersUserId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AddressAppUser", x => new { x.AddressesAdressId, x.UsersUserId });
                    table.ForeignKey(
                        name: "FK_AddressAppUser_Addresses_AddressesAdressId",
                        column: x => x.AddressesAdressId,
                        principalTable: "Addresses",
                        principalColumn: "AdressId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AddressAppUser_AppUsers_UsersUserId",
                        column: x => x.UsersUserId,
                        principalTable: "AppUsers",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AddressAppUser_UsersUserId",
                table: "AddressAppUser",
                column: "UsersUserId");
        }
    }
}
