using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AutoPjesaa.Migrations
{
    /// <inheritdoc />
    public partial class mig31 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "FavoriteParts",
                columns: table => new
                {
                    favoriteid = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    partid = table.Column<int>(type: "int", nullable: false),
                    userid = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FavoriteParts", x => x.favoriteid);
                    table.ForeignKey(
                        name: "FK_FavoriteParts_AppUsers_userid",
                        column: x => x.userid,
                        principalTable: "AppUsers",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FavoriteParts_Parts_partid",
                        column: x => x.partid,
                        principalTable: "Parts",
                        principalColumn: "PartId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FavoriteParts_partid",
                table: "FavoriteParts",
                column: "partid");

            migrationBuilder.CreateIndex(
                name: "IX_FavoriteParts_userid_partid",
                table: "FavoriteParts",
                columns: new[] { "userid", "partid" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FavoriteParts");
        }
    }
}
