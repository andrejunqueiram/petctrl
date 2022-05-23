import { ownersCreateService } from '../../services/owners/ownersCreate.service';
import { DataSource } from 'typeorm';
import { AppDataSource } from '../../data-source';

describe('Criação do tutor', () => {
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

  test('Deve entrar com as informações do novo tutor no db', async () => {
    const name = 'nome';
    const email = 'email@mail.com';
    const address = 'endereço';
    const phone_number = '123456789';

    const ownerData = { name, email, address, phone_number };

    const newOwner = await ownersCreateService(ownerData);

    expect(newOwner).toEqual(
      expect.objectContaining({
        name,
        email,
        address,
        phone_number,
      })
    );
  });
});
