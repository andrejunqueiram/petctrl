import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class addForeignKeyPetServiceList1653055289670
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      "servicelist",
      new TableForeignKey({
        name: "Service_List_Pet_FK",
        columnNames: ["petId"],
        referencedColumnNames: ["id"],
        referencedTableName: "pets",
        onUpdate: "cascade",
      })
    );

    await queryRunner.createForeignKey(
      "petservices",
      new TableForeignKey({
        name: "Pet_Service_Service_List_FK",
        columnNames: ["serviceListId"],
        referencedColumnNames: ["id"],
        referencedTableName: "servicelist",
        onDelete: "cascade",
        onUpdate: "cascade",
      })
    );

    await queryRunner.createForeignKey(
      "petservices",
      new TableForeignKey({
        name: "Pet_Service_Service_FK",
        columnNames: ["serviceId"],
        referencedColumnNames: ["id"],
        referencedTableName: "services",
        onDelete: "cascade",
        onUpdate: "cascade",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("servicelist", "Service_List_Pet_FK");
    await queryRunner.dropForeignKey(
      "servicelist",
      "Service_List_Pet_Service_FK"
    );
    await queryRunner.dropForeignKey("petservices", "Pet_Service_Service_FK");
  }
}
