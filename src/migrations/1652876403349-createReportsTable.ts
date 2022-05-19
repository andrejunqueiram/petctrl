import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createReportsTable1652876403349 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    await queryRunner.createTable(
      new Table({
        name: "reports",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "pet_id",
            type: "varchar",
            length: "255",
          },
          {
            name: "reports",
            type: "varchar",
            length: "255",
          },
        ],
      })
    );
  }

  // Dentro do método down eu faço o contrário
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("reports");
  }
}
