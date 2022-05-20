import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createServiceListTable1653055010916 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    await queryRunner.createTable(
      new Table({
        name: "servicelist",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "petId",
            type: "uuid",
          },
          // {
          //   name: "petServiceId",
          //   type: "uuid",
          // },
          {
            name: "service_date",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("servicelist");
  }
}
