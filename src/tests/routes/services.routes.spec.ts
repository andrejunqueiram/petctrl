import { DataSource } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/users.entity";

import { v4 as uuid } from "uuid";
import * as bcrypt from "bcryptjs";
import app from "../../app";
import request from "supertest";

describe("Teste para validação dos serviços", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Erro durante a inicialização do Data Source", err);
      });
    const userRepository = AppDataSource.getRepository(User);
    const user = userRepository.create({
      name: "admin",
      password: await bcrypt.hash("admin", 8),
      isAdm: true,
    });
    await userRepository.save(user);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Deve retornar que não é possível a criação devido a falta de token", async () => {
    const serviceData = {
      name: "serviço",
      price: 1,
      category: "serviços",
    };

    const res = await request(app).post("/services").send(serviceData);
    expect(res.status).toBe(404);

    expect(res.body).toEqual({
      status: "error",
      message: "Token de autenticação inexistente",
    });
  });

  test("Deve ser possível criar um serviço", async () => {
    const serviceData = {
      name: "serviço",
      price: 1,
      category: "serviços",
    };
    const loginResponse = await request(app).post("/sessions").send({
      name: "admin",
      password: "admin",
    });
    const token = loginResponse.body.token;
    const res = await request(app)
      .post("/services")
      .set("Authorization", `Bearer ${token}`)
      .send(serviceData);

    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
  });

  test("Não deve ser possível criar serviços de mesmo nome", async () => {
    const name = "serviço";
    const price = 1;
    const category = "serviços";
    const serviceDataOne = {
      name,
      price,
      category,
    };
    const serviceDataTwo = {
      name,
      price,
      category,
    };
    const loginResponse = await request(app)
      .post("/sessions")
      .send({ name: "admin", password: "admin" });
    const token = loginResponse.body.token;

    const resOne = await request(app)
      .post("/services")
      .set("Authorization", `Bearer ${token}`)
      .send(serviceDataOne);

    const resTwo = await request(app)
      .post("/services")
      .set("Authorization", `Bearer ${token}`)
      .send(serviceDataTwo);

    expect(resTwo.status).toBe(409);
    expect(resTwo.body.status).toBeDefined();
  });

  test("Deve ser possível listar os serviços", async () => {
    const loginResponse = await request(app).post("/sessions").send({
      name: "admin",
      password: "admin",
    });
    const token = loginResponse.body.token;
    const res = await request(app)
      .get("/services")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("map");
  });

  test("Deve ser possível atualizar um serviço", async () => {
    const loginResponse = await request(app).post("/sessions").send({
      name: "admin",
      password: "admin",
    });
    const token = loginResponse.body.token;
    const services = await request(app)
      .get("/services")
      .set("Authorization", `Bearer ${token}`);
    const serviceList = services.body;

    const service = serviceList.find((item: any) => item.name === "serviço");
    console.log(service);
    const id = service.id;

    const res = await request(app)
      .patch(`/services/${id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "serviço",
        price: 10,
        category: "serviços comuns",
      });

    expect(res.status).toBe(200);
  });

  test("Não deve ser possível atualizar um serviço por falta de token", async () => {
    const loginResponse = await request(app).post("/sessions").send({
      name: "admin",
      password: "admin",
    });
    const token = loginResponse.body.token;
    const services = await request(app)
      .get("/services")
      .set("Authorization", `Bearer ${token}`);
    const serviceList = services.body;
    const service = serviceList.find((item: any) => item.name === "serviço");

    const id = service.id;

    const res = await request(app).patch(`/services/${id}`).send({
      name: "serviço comum",
      price: "10",
      category: "serviços comuns",
    });

    expect(res.status).toBe(404);
  });

  test("Não deve ser possível deletar um serviço por id errado", async () => {
    const loginResponse = await request(app).post("/sessions").send({
      name: "admin",
      password: "admin",
    });
    const token = loginResponse.body.token;

    const id = uuid();

    const res = await request(app)
      .delete(`/services/${id}`)
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(res.status).toBe(404);
  });

  test("Deve ser possível deletar um tutor", async () => {
    const loginResponse = await request(app).post("/sessions").send({
      name: "admin",
      password: "admin",
    });
    const token = loginResponse.body.token;
    const services = await request(app)
      .get("/services")
      .set("Authorization", `Bearer ${token}`);
    const serviceList = services.body;

    const service = serviceList.find((item: any) => item.name === "serviço");

    const id = service.id;

    const res = await request(app)
      .delete(`/services/${id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(204);
  });
});
