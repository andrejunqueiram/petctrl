import { MigrationInterface, QueryRunner } from "typeorm";
import * as bcrypt from "bcryptjs";

export class criacaoUsuarioAdmin1653325832771 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const hashedPassword = await bcrypt.hash("admin", 8);

    await queryRunner.query(
      `INSERT INTO users (name, "isAdm", password) VALUES ('admin', true, $1)`,
      [hashedPassword]
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("DELETE FROM users WHERE name = 'admin'");
  }
}
