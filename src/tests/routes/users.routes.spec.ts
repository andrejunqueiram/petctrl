import { DataSource } from "typeorm";
import { AppDataSource } from "../../data-source";
import request from "supertest";
import app from "../../app";

import { v4 as uuid } from "uuid";
import { User } from "../../entities/users.entity";
import * as bcript from "bcryptjs";

describe("Teste para validação do usuário", () => {
  let connection: DataSource;
  let token: string;
  let user_id: string;
  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Erro durante a inicialização do Data Source", err);
      });
    const userRepository = AppDataSource.getRepository(User);
    const user = userRepository.create({
      name: "admin",
      password: await bcript.hash("admin", 8),
      isAdm: true,
    });
    await userRepository.save(user);

    const loginResponse = await request(app).post("/sessions").send({
      name: "admin",
      password: "admin",
    });
    token = loginResponse.body.token;
  });
  afterAll(async () => {
    await connection.destroy();
  });
  test("Deve retornar que não é possível a criação de user devido a falta de token", async () => {
    const name = "nome";
    const password = await bcript.hash("1234", 8);
    const isAdm = false;
    const userData = { name, password, isAdm };

    const response = await request(app).post("/users").send(userData);
    expect(response.status).toBe(404);

    expect(response.body).toEqual({
      status: "error",
      message: "Token de autenticação inexistente",
    });
  });
  test("Deve ser possível a criação de user", async () => {
    const name = "nome";
    const password = await bcript.hash("1234", 8);
    const isAdm = false;
    const userData = { name, password, isAdm };

    const response = await request(app)
      .post("/users")
      .set("Authorization", `Bearer ${token}`)
      .send(userData);

    user_id = response.body.id;
    expect(response.status).toBe(201);

    expect(response.body.id).toBeDefined();
  });
  test("Não deve ser possível listar users por falta de token", async () => {
    const response = await request(app).get("/users");
    expect(response.status).toBe(404);

    expect(response.body).toEqual({
      status: "error",
      message: "Token de autenticação inexistente",
    });
  });
  test("Deve ser possível listar users", async () => {
    const response = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);

    expect(response.body).toHaveProperty("map");
  });
  test("Não deve ser possível atualizar user por falta de token", async () => {
    const response = await request(app)
      .patch(`/users/${user_id}`)
      .send({
        name: "nome 2",
        password: await bcript.hash("12345", 8),
        isAdm: true,
      });
    expect(response.status).toBe(404);

    expect(response.body).toEqual({
      status: "error",
      message: "Token de autenticação inexistente",
    });
  });
  test("Deve ser possível atualizar user", async () => {
    const response = await request(app)
      .patch(`/users/${user_id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "nome 2",
        password: await bcript.hash("12345", 8),
        isAdm: true,
      });
    expect(response.status).toBe(200);
  });
  test("Não deve ser possível atualizar um user com id invalido", async () => {
    const id = uuid();
    const response = await request(app)
      .patch(`/users/${id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "nome 2",
        password: await bcript.hash("12345", 8),
        isAdm: true,
      });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      status: "error",
      message: "O usuário não foi encontrado",
    });
  });
  test("Não deve ser possível deletar user por falta de token", async () => {
    const response = await request(app)
      .delete(`/users/${user_id}`)
      .send({
        name: "nome 2",
        password: await bcript.hash("12345", 8),
        isAdm: true,
      });
    expect(response.status).toBe(404);

    expect(response.body).toEqual({
      status: "error",
      message: "Token de autenticação inexistente",
    });
  });
  test("Deve ser possível deletar user", async () => {
    const response = await request(app)
      .delete(`/users/${user_id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "nome 2",
        password: await bcript.hash("12345", 8),
        isAdm: true,
      });
    expect(response.status).toBe(204);
  });
  test("Não deve ser possível deletar um user com id invalido", async () => {
    const id = uuid();
    const response = await request(app)
      .delete(`/users/${id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "nome 2",
        password: await bcript.hash("12345", 8),
        isAdm: true,
      });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      status: "error",
      message: "O usuário não foi encontrado",
    });
  });
});
