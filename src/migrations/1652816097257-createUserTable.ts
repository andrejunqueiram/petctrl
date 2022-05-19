import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createUserTable1652816097257 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    await queryRunner.createTable(
      new Table({
        name: "users",
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
            name: "isAdm",
            type: "boolean",
          },
          {
            name: "password",
            type: "varchar",
          },
        ],
      })
    );
  }

  // Dentro do método down eu faço o contrário
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
