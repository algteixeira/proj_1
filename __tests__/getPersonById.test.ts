import request from 'supertest';
import { getConnection } from 'typeorm';
import { app } from '../src/app';
import { connect } from '../src/infra/database/postgres';

beforeAll(async () => {
  await connect();
});

afterEach(async () => {
  const entities = getConnection().entityMetadatas;
  for (const entity of entities) {
    const repository = await getConnection().getRepository(entity.name);
    await repository.query(
      `TRUNCATE ${entity.tableName} RESTART IDENTITY CASCADE;`,
    );
  }
});

describe('Controllers / PersonController / get{:id}', () => {
  test('should return a person', async () => {
    const city = {
      name: 'Jamalville',
      state: 'SC',
    };
    let response = await request(app).post('/cidade').send(city);

    expect(response.status).toBe(201);
    const { id } = response.body;
    const pessoa = {
      name: 'jota',
      birthday: '19/08/1997',
      city_id: id,
      sex: 'MASCULINO',
    };
    response = await request(app).post('/pessoa').send(pessoa);

    expect(response.status).toBe(201);

    response = await request(app).get(`/pessoa/${response.body.id}`);
    expect(response.body.name).toBe('jota');
    expect(response.body.gender).toBe('MASCULINO');
    expect(response.body.birthday).toBe('19/08/1997');
    expect(response.body.age).toBe(24);
    expect(response.status).toBe(200);
  });

  test('should return a notFound(404)', async () => {
    const response = await request(app).get(
      '/pessoa/117928ec-0735-4bf3-9990-90573ebbc1c1',
    );
    expect(response.body).toBe(
      `117928ec-0735-4bf3-9990-90573ebbc1c1 haven't been found in the database.`,
    );
    expect(response.status).toBe(404);
  });

  test('should return a bad request (400) error', async () => {
    const response = await request(app).get(
      '/pessoa/117928ec-0735-4bf3-9990-90573ebbc1z1',
    );
    expect(response.body.details[0].message).toBe(
      '"id" with value "117928ec-0735-4bf3-9990-90573ebbc1z1" fails to match the required pattern: /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/',
    );
    expect(response.status).toBe(400);
  });
});
