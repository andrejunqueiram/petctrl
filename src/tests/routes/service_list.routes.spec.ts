import { DataSource } from "typeorm";
import { AppDataSource } from "../../data-source";
import request from "supertest";
import app from "../../app";

import { v4 as uuid } from "uuid";
import { User } from "../../entities/users.entity";
import * as bcript from "bcryptjs";
import { Owner } from "../../entities/owners.entity";
import { Service } from "../../entities/services.entity";
import { Pet } from "../../entities/pets.entity";
// jest.mock("uuid");
describe("Teste para validação do tutor", () => {
  let connection: DataSource;
  let token: string;
  let service_id: string;
  let owner_id: string;
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
      password: await bcript.hash("admin", 8),
      isAdm: true,
    });
    await userRepository.save(user);

    const loginResponse = await request(app).post("/sessions").send({
      name: "admin",
      password: "admin",
    });
    token = loginResponse.body.token;

    const ownerRepository = AppDataSource.getRepository(Owner);
    const owner = ownerRepository.create({
      name: "nome",
      email: "mail@mail.com",
      address: "fake address",
      phone_number: "123456789",
    });
    await ownerRepository.save(owner);
    owner_id = owner.id;

    const petRepository = AppDataSource.getRepository(Pet);
    const pet = petRepository.create({
      name: "fake pet",
      breed: "fake breed",
      type: "fake type",
      birthday: "10/10/2010",
      ownerId: owner_id,
    });
    await petRepository.save(pet);
    pet_id = pet.id;

    const serviceRepository = AppDataSource.getRepository(Service);
    const service = serviceRepository.create({
      name: "serviço teste",
      price: 10,
      category: "categoria teste",
    });
    await serviceRepository.save(service);
    service_id = service.id;
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Deve retornar que não é possível a criação devido a falta de token", async () => {
    const pet_services = [service_id];
    const serviceListData = { pet_id, pet_services };

    const response = await request(app)
      .post("/pets/servicelist")
      .send(serviceListData);

    expect(response.status).toBe(404);

    expect(response.body).toEqual({
      status: "error",
      message: "Token de autenticação inexistente",
    });
  });

  test("Deve ser possível criar uma lista de serviços", async () => {
    const pet_services = [service_id];
    const serviceListData = { pet_id, pet_services };
    console.log(serviceListData);
    const response = await request(app)
      .post("/pets/servicelist")
      .set("Authorization", `Bearer ${token}`)
      .send(serviceListData);
    console.log(response.body);
    // expect(response.status).toBe(201);

    // expect(response.body.id).toBeDefined();
  });

  //   test("Não deve ser possível criar um tutor com mesmo email", async () => {
  //     const name = "nome";
  //     const email = "email@mail.com";
  //     const address = "endereço";
  //     const phone_number = "123456789";
  //     const ownerData = { name, email, address, phone_number };
  //     const sOwnerData = { name, email, address, phone_number };
  //     const loginResponse = await request(app).post("/sessions").send({
  //       name: "admin",
  //       password: "admin",
  //     });
  //     const token = loginResponse.body.token;
  //     const createResponse = await request(app)
  //       .post("/owners")
  //       .set("Authorization", `Bearer ${token}`)
  //       .send(ownerData);

  //     const response = await request(app)
  //       .post("/owners")
  //       .set("Authorization", `Bearer ${token}`)
  //       .send(sOwnerData);

  //     expect(response.status).toBe(409);
  //     // expect(uuidSpy).toHaveBeenCalled();
  //     expect(response.body.status).toBeDefined();
  //   });
  //   test("Deve ser possível atualizar um tutor", async () => {
  //     const loginResponse = await request(app).post("/sessions").send({
  //       name: "admin",
  //       password: "admin",
  //     });
  //     const token = loginResponse.body.token;
  //     const owners = await request(app)
  //       .get("/owners")
  //       .set("Authorization", `Bearer ${token}`);
  //     const ownerList = owners.body;

  //     const owner = ownerList.find((item: any) => item.name === "nome");

  //     const id = owner.id;
  //     const response = await request(app)
  //       .patch(`/owners/${id}`)
  //       .set("Authorization", `Bearer ${token}`)
  //       .send({
  //         name: "nome",
  //         email: "email2@mail.com",
  //         adress: "endereco 2",
  //         phone_number: "2345678901",
  //       });

  //     expect(response.status).toBe(200);
  //   });
  //   test("Não deve ser possível atualizar um tutor por falta de token", async () => {
  //     const loginResponse = await request(app).post("/sessions").send({
  //       name: "admin",
  //       password: "admin",
  //     });
  //     const token = loginResponse.body.token;
  //     const owners = await request(app)
  //       .get("/owners")
  //       .set("Authorization", `Bearer ${token}`);
  //     const ownerList = owners.body;
  //     const owner = ownerList.find((item: any) => item.name === "nome");

  //     const id = owner.id;

  //     const response = await request(app).patch(`/owners/${id}`).send({
  //       name: "nome",
  //       email: "email2@mail.com",
  //       adress: "endereco 2",
  //       phone_number: "2345678901",
  //     });

  //     expect(response.status).toBe(404);
  //   });
  //   test("Deve ser possível listar os tutores", async () => {
  //     const loginResponse = await request(app).post("/sessions").send({
  //       name: "admin",
  //       password: "admin",
  //     });
  //     const token = loginResponse.body.token;
  //     const response = await request(app)
  //       .get("/owners")
  //       .set("Authorization", `Bearer ${token}`)
  //       .send();

  //     expect(response.status).toBe(200);
  //     expect(response.body).toHaveProperty("map");
  //   });
  //   test("Não deve ser possível deletar um tutor por id errado", async () => {
  //     const loginResponse = await request(app).post("/sessions").send({
  //       name: "admin",
  //       password: "admin",
  //     });
  //     const token = loginResponse.body.token;

  //     const id = uuid();

  //     const response = await request(app)
  //       .delete(`/owners/${id}`)
  //       .set("Authorization", `Bearer ${token}`)
  //       .send();

  //     expect(response.status).toBe(404);
  //   });
  //   test("Deve ser possível deletar um tutor", async () => {
  //     const loginResponse = await request(app).post("/sessions").send({
  //       name: "admin",
  //       password: "admin",
  //     });
  //     const token = loginResponse.body.token;
  //     const owners = await request(app)
  //       .get("/owners")
  //       .set("Authorization", `Bearer ${token}`);
  //     const ownerList = owners.body;

  //     const owner = ownerList.find((item: any) => item.name === "nome");

  //     const id = owner.id;

  //     const response = await request(app)
  //       .delete(`/owners/${id}`)
  //       .set("Authorization", `Bearer ${token}`);

  //     expect(response.status).toBe(204);
  //   });
});
