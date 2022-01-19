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

describe('Controllers / City / get', () => {
  test('should return cities', async () => {
    const city = {
      name: 'Pelotas',
      state: 'RS',
    };
    let response = await request(app).post('/cidade').send(city);
    expect(response.status).toBe(201);
    response = await request(app).get('/cidade/?name=Pelotas');
    expect(response.body.Cities[0].name).toBe('Pelotas');
    expect(response.status).toBe(200);
  });

  test('should return cities', async () => {
    const response = await request(app).get('/cidade/?state=RS');

    expect(response.status).toBe(200);
    expect(response.body.total).toBe(0);
  });

  test('should return cities', async () => {
    const city = {
      name: 'Pelotas',
      state: 'RS',
    };
    let response = await request(app).post('/cidade').send(city);
    expect(response.status).toBe(201);
    response = await request(app).get('/cidade/?state=RS&limit=5&page=1');
    expect(response.body.total).toBe(1);
    expect(response.status).toBe(200);
  });

  test('have an invalid state', async () => {
    const response = await request(app).get('/cidade/?state=acaraje');
    expect(response.body._original.state).toBe('acaraje');
    expect(response.status).toBe(400);
  });

  test('have an invalid query', async () => {
    const response = await request(app).get('/cidade/?felipe=santos');
    expect(response.body.details[0].message).toBe('"felipe" is not allowed');
    expect(response.status).toBe(400);
  });
});
