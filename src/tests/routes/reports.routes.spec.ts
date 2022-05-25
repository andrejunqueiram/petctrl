import { Any, DataSource } from "typeorm";
import { AppDataSource } from "../../data-source";
import request from "supertest";
import app from "../../app";

import { v4 as uuid } from "uuid";
import { User } from "../../entities/users.entity";
import * as bcript from "bcryptjs";

describe("Teste para validação dos reports", () => {
  let connection: DataSource;
  let token: string;
  let pet_id: string;
  let report_id: string;

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

    const ownerResponse = await request(app)
      .post("/owners")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "nome",
        email: "email@mail.com",
        address: "endereço",
        phone_number: "123456789",
      });

    const petResponse = await request(app)
      .post("/pets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "name",
        breed: "animal",
        type: "tipo",
        birthday: "03/02/0001",
        owner_id: ownerResponse.body.id,
      });
    pet_id = petResponse.body.id;
  });
  afterAll(async () => {
    await connection.destroy();
  });
  test("Deve retornar que não é possível a criação devido a falta de token", async () => {
    const reports = "consulta de rotina";

    const reportsData = { reports, pet_id };

    const response = await request(app).post("/reports").send(reportsData);
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      status: "error",
      message: "Token de autenticação inexistente",
    });
  });
  test("Deve ser possível criar um report", async () => {
    const reports = "consulta de rotina";

    const reportsData = { reports, pet_id };

    const response = await request(app)
      .post("/reports")
      .set("Authorization", `Bearer ${token}`)
      .send(reportsData);

    report_id = response.body.id;

    expect(response.status).toBe(201);

    expect(response.body.id).toBeDefined();
  });
  test("Deve retornar que não é possível listar as reports por falta de token", async () => {
    const response = await request(app).get("/reports");
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      status: "error",
      message: "Token de autenticação inexistente",
    });
  });
  test("Deve retornar a lista de reports", async () => {
    const response = await request(app)
      .get("/reports")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);

    expect(response.body).toHaveProperty("map");
  });
  test("Deve retornar que não é possível atualizar o report por falta de token", async () => {
    const response = await request(app).patch(`/reports/${report_id}`).send({
      reports: "consulta de rotina verificada",
      pet_id,
    });
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      status: "error",
      message: "Token de autenticação inexistente",
    });
  });
  test("Deve ser possível atualizar o report", async () => {
    const response = await request(app)
      .patch(`/reports/${report_id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        reports: "consulta de rotina verificada",
        pet_id,
      });
    expect(response.status).toBe(200);
  });
  test("Deve retornar que não é possível atualizar o report por falta de id compatível", async () => {
    const id = uuid();
    const response = await request(app)
      .patch(`/reports/${id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        reports: "consulta de rotina verificada",
        pet_id,
      });
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      status: "error",
      message: "Nenhum relatório com esse id.",
    });
  });
  test("Deve retornar que não é possível deletar o report por falta de token", async () => {
    const response = await request(app).delete(`/reports/${report_id}`);
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      status: "error",
      message: "Token de autenticação inexistente",
    });
  });
  test("Deve ser possível deletar o report", async () => {
    const response = await request(app)
      .delete(`/reports/${report_id}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(204);
  });
  test("Deve retornar que não é possível atualizar o report por falta de id compatível", async () => {
    const id = uuid();
    const response = await request(app)
      .delete(`/reports/${id}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      status: "error",
      message: "Nenhum relatório com esse id.",
    });
  });
});
