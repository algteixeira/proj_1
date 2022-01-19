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

describe('Controllers / PersonController / post', () => {
  test('should create a person', async () => {
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
    expect(response.body.name).toBe('jota');
    expect(response.body.gender).toBe('MASCULINO');
    expect(response.body.birthday).toBe('19/08/1997');
    expect(response.body.age).toBe(24);
    expect(response.status).toBe(201);
  });

  test('should return a bad request because chuveiro is not allowed', async () => {
    const city = {
      name: 'Pelotas',
      state: 'RS',
    };
    let response = await request(app).post('/cidade').send(city);

    expect(response.status).toBe(201);
    const { id } = response.body;
    const pessoa = {
      name: 'jota',
      chuveiro: 'dont have',
      birthday: '19/08/1997',
      city_id: id,
      sex: 'MASCULINO',
    };
    response = await request(app).post('/pessoa').send(pessoa);
    expect(response.body.details[0].message).toBe('"chuveiro" is not allowed');
    expect(response.status).toBe(400);
  });

  test('should return a not found beucase given city doesnt exists', async () => {
    const pessoa = {
      name: 'jota',
      birthday: '19/08/1997',
      city_id: '0aaaf282-a39a-4ae0-827c-3b16d09caa0d',
      sex: 'MASCULINO',
    };
    const response = await request(app).post('/pessoa').send(pessoa);
    expect(response.body).toBe(
      `0aaaf282-a39a-4ae0-827c-3b16d09caa0d haven't been found in the database.`,
    );
    expect(response.status).toBe(404);
  });
});
