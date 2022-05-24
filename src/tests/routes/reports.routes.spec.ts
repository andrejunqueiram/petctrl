import { Any, DataSource } from 'typeorm';
import { AppDataSource } from '../../data-source';
import request from 'supertest';
import app from '../../app';

import { v4 as uuid } from 'uuid';
import { User } from '../../entities/users.entity';
import * as bcript from 'bcryptjs';
import { Pet } from '../../entities/pets.entity';
import { Owner } from '../../entities/owners.entity';

// jest.mock("uuid");
describe('Teste para validação dos reports', () => {
  let connection: DataSource;
  let token: string;
  let pet_id: string;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error('Erro durante a inicialização do Data Source', err);
      });
      
      const userRepository = AppDataSource.getRepository(User);
      const ownerRepository = AppDataSource.getRepository(Owner);
      const petsRepository = AppDataSource.getRepository(Pet);

      const user = userRepository.create({
        name: 'admin',
        password: await bcript.hash('admin', 8),
        isAdm: true,
      });
      const owner = ownerRepository.create({
        name: 'nome',
        email: 'email@mail.com',
        address: 'endereço',
        phone_number: '123456789',
      });
      const pets = petsRepository.create({
        name: 'name',
        breed: 'animal',
        type: 'tipo',
        birthday: '03/02/0001',
    })
    const loginResponse = await request(app).post("/sessions").send({
        name: "admin",
        password: "admin",
      });
      
      await userRepository.save(user);
      await ownerRepository.save(owner);
      await petsRepository.save(pets);
      token = loginResponse.body.token;
})
  afterAll(async () => {
    await connection.destroy();
  });
  test("Deve retornar que não é possível a criação devido a falta de token", async () => {  
    const reports = "consulta de rotina";
    
    const reportsData = { reports};

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
    // const uuidSpy = jest.spyOn(uuid, "v4");
    // uuidSpy.mockReturnValue("some-uuid");
    const response = await request(app)
      .post("/reports")
      .set("Authorization", `Bearer ${token}`)
      .send(reportsData);

      console.log(response)

    expect(response.status).toBe(201);
    // expect(uuidSpy).toHaveBeenCalled();
    expect(response.body.id).toBeDefined();
  });


});
