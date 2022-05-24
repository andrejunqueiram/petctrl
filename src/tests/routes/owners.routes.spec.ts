import { DataSource } from 'typeorm';
import { AppDataSource } from '../../data-source';
import request from 'supertest';
import app from '../../app';
import {v4 as uuid} from 'uuid';

describe('Teste para validação do tutor', () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error('Erro durante a inicialização do Data Source', err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test('Deve retornar que não é possível a criação devido a falta de token', async () => {
    const name = 'nome';
    const email = 'email@mail.com';
    const address = 'endereço';
    const phone_number = '123456789';
    const ownerData = { name, email, address, phone_number };

    const response = await request(app).post('/owners').send(ownerData);
    expect.objectContaining({
      message: 'Token de autenticação inexistente',
      status: 'error',
    });
  });
  test('Deve retornar status 204', async () => {
    const id = uuid();
    const response = await request(app).delete('/owners/:id');
    expect(response.status).toBe(204);
  });
});
