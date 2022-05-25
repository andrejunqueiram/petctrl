import { DataSource } from "typeorm";
import { AppDataSource } from "../../data-source";
import request from "supertest";
import app from "../../app";
import { User } from "../../entities/users.entity";
import * as bcript from "bcryptjs";

describe("teste de rotas servicelist", () => {
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

    const ownerResponse = await request(app)
      .post("/owners")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "nome",
        email: "mail@mail.com",
        address: "fake address",
        phone_number: "123456789",
      });
    owner_id = ownerResponse.body.id;

    const petData = {
      name: "fake pet",
      breed: "fake breed",
      type: "fake type",
      birthday: "10/10/2010",
      owner_id,
    };
    const petResponse = await request(app)
      .post("/pets")
      .set("Authorization", `Bearer ${token}`)
      .send(petData);
    pet_id = petResponse.body.id;

    const serviceResponse = await request(app)
      .post("/services")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "serviço teste",
        price: 10,
        category: "categoria teste",
      });
    service_id = serviceResponse.body.id;
  });
  afterAll(async () => {
    await connection.destroy();
  });
  test("Deve ser possível criar uma lsita de serviços", async () => {
    // const pet_services = [service_id];
    // const serviceListData = { pet_id, pet_services };
    // const response = await request(app)
    //   .post("/pets/servicelist")
    //   .set("Authorization", `Bearer ${token}`)
    //   .send(serviceListData);
    // expect(response.status).toBe(201);
  });
});
