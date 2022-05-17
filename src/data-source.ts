import { DataSource } from "typeorm";
import "dotenv/config";

export const AppDataSource =
  process.env.NODE_ENV === "test"
    ? new DataSource({
        type: "sqlite",
        database: ":memory:",
        entities: ["src/entities/*.ts"],
        synchronize: true,
      })
    : new DataSource({
        type: "postgres",
        host: "localhost",
        url: process.env.DATABASE_URL,
        synchronize: false,
        logging: true,
        ssl:
          process.env.NODE_ENV === "production"
            ? { rejectUnauthorized: false }
            : false,
        entities:
          process.env.NODE_ENV === "production"
            ? ["dist/src/entities/*.js"]
            : ["src/entities/*.ts"],
        migrations:
          process.env.NODE_ENV === "production"
            ? ["dist/src/migrations/*.js"]
            : ["src/migrations/*.ts"],
      });
