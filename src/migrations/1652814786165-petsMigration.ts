import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class petsMigration1652814786165 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    await queryRunner.createTable(
      new Table({
        name: "pets",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "name",
            type: "varchar",
            length: "255",
          },
          {
            name: "ownerId",
            type: "uuid",
          },
          {
            name: "type",
            type: "varchar",
            length: "50",
          },
          {
            name: "breed",
            type: "varchar",
            length: "255",
          },
          {
            name: "birthday",
            type: "timestamp",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("pets");
  }
}
