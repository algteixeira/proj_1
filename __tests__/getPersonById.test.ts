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

describe('This test should run fine and', () => {
  test('should return a person', async () => {
    const city = {
      name: 'Pelotas',
      state: 'RS',
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

    expect(response.status).toBe(200);
  });
});

describe('This test uses an unexistent id and', () => {
  test('should return a notFound(404)', async () => {
    const response = await request(app).get(
      '/pessoa/117928ec-0735-4bf3-9990-90573ebbc1c1',
    );

    expect(response.status).toBe(404);
  });
});

describe('This test have an invalid id format and', () => {
  test('should return a bad request (400) error', async () => {
    const response = await request(app).get(
      '/pessoa/117928ec-0735-4bf3-9990-90573ebbc1z1',
    );

    expect(response.status).toBe(400);
  });
});
