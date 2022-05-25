import { DataSource } from "typeorm";
import { AppDataSource } from "../../data-source";
import request from "supertest";
import app from "../../app";

import { v4 as uuid } from "uuid";
import { User } from "../../entities/users.entity";

import * as bcrypt from "bcryptjs";
import { Owner } from "../../entities/owners.entity";
import { Pet } from "../../entities/pets.entity";

describe("Teste para validação do pet", () => {
  let connection: DataSource;
  let owner_id: string;
  let token: string;
  let pet_id: string;

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

    const ownerRepository = AppDataSource.getRepository(Owner);
    const owner = ownerRepository.create({
      name: "nome",
      email: "mail@mail.com",
      address: "fake address",
      phone_number: "123456789",
    });
    await ownerRepository.save(owner);
    owner_id = owner.id;

    const loginResponse = await request(app).post("/sessions").send({
      name: "admin",
      password: "admin",
    });
    token = loginResponse.body.token;
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Deve retornar que não é possível a criação devido a falta de token", async () => {
    const name = "pet fake";
    const breed = "fake breed";
    const type = "fake type";
    const birthday = "01/01/2000";

    const petData = { name, breed, type, birthday, owner_id };

    const response = await request(app).post("/pets").send(petData);
    expect(response.status).toBe(404);

    expect(response.body).toEqual({
      status: "error",
      message: "Token de autenticação inexistente",
    });
  });

  test("Deve ser possível criar um pet", async () => {
    const name = "pet fake";
    const breed = "fake breed";
    const type = "fake type";
    const birthday = "01/01/2000";

    const petData = { name, breed, type, birthday, owner_id };

    const response = await request(app)
      .post("/pets")
      .set("Authorization", `Bearer ${token}`)
      .send(petData);

    pet_id = response.body.id;

    expect(response.status).toBe(201);

    expect(response.body.id).toBeDefined();
  });

  test("Não deve ser possível criar um pet com id do tutor inexistente", async () => {
    const name = "pet fake";
    const breed = "fake breed";
    const type = "fake type";
    const birthday = "01/01/2000";

    const petData = { name, breed, type, birthday, owner_id: uuid() };

    const response = await request(app)
      .post("/pets")
      .set("Authorization", `Bearer ${token}`)
      .send(petData);

    expect(response.status).toBe(404);

    expect(response.body.status).toBeDefined();
  });
  test("Deve ser possível atualizar um pet", async () => {
    const response = await request(app)
      .patch(`/pets/${pet_id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "new name",
        breed: "new breed",
        birthday: "10/10/2010",
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: pet_id,
        name: "new name",
        breed: "new breed",
        birthday: "10/10/2010",
        ownerId: owner_id,
        reports: [],
        service_list: [],
      })
    );
  });

  test("Não deve ser possível atualizar um pet por falta de token", async () => {
    const response = await request(app).patch(`/pets/${pet_id}`).send({
      name: "new name",
      breed: "new breed",
      birthday: "10/10/2010",
    });

    expect(response.status).toBe(404);
  });
  test("Deve ser possível listar os pets", async () => {
    const response = await request(app)
      .get("/pets")
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("map");
  });
  test("Deve ser possível listar um pet pelo id", async () => {
    const response = await request(app)
      .get(`/pets/${pet_id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toEqual(pet_id);
  });
  test("Não deve ser possível deletar um pet por id errado", async () => {
    const id = uuid();

    const response = await request(app)
      .delete(`/pets/${id}`)
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.status).toBe(404);
  });

  test("Deve ser possível deletar um pet", async () => {
    const response = await request(app)
      .delete(`/pets/${pet_id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(204);
  });
});
