import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class addForeignKeyPetOwnerReport1652980896089
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      "pets",
      new TableForeignKey({
        name: "Pet_Owner_FK",
        columnNames: ["ownerId"],
        referencedColumnNames: ["id"],
        referencedTableName: "owners",
        onUpdate: "cascade",
      })
    );

    await queryRunner.createForeignKey(
      "reports",
      new TableForeignKey({
        name: "Reports_FK",
        columnNames: ["petId"],
        referencedColumnNames: ["id"],
        referencedTableName: "pets",
        onDelete: "cascade",
        onUpdate: "cascade",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("reports", "Reports_FK");
    await queryRunner.dropForeignKey("pets", "Pet_Owner_FK");
  }
}
