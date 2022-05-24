import { AppDataSource } from "../../data-source";
import request from "supertest";
import app from "../../app";
import { DataSource } from "typeorm";
import { sessionsLogin } from "../../validation/sessions/sessionsLogin.validation";
import { User } from "../../entities/users.entity";
import * as bcript from "bcryptjs";

describe("Teste para validação do tutor", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Erro durante a inicialização do Data Source", err);
      });
    const userRepository = AppDataSource.getRepository(User);
    const user = userRepository.create({
      name: "Artur",
      password: await bcript.hash("1234", 8),
      isAdm: false,
    });
    await userRepository.save(user);
  });

  afterAll(async () => {
    await connection.destroy();
  });
  test("Login", async () => {
    const login = {
      name: "Artur",
      password: "1234",
    };
    const response = await request(app).post("/sessions").send({
      name: "Artur",
      password: "1234",
    });
    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  test("Erro de Login", async () => {
    const login = {
      name: "Artur",
      password: "1234",
    };
    const response = await request(app).post("/sessions").send({
      name: "Artur",
      password: "123",
    });
    expect(response.status).toBe(400);
  });
});
