import request from 'supertest';
import { app } from '../src/app';
import { getConnection } from 'typeorm';
import { connect } from "../src/infra/database/postgres";

beforeAll(async() => {
    await connect();
});

afterEach(async() => {
  const entities = getConnection().entityMetadatas;
  for (const entity of entities) {
    const repository = await getConnection().getRepository(entity.name);
    await repository.query(`TRUNCATE ${entity.tableName} RESTART IDENTITY CASCADE;`);
  }
});

describe('This test should run fine', () => {
  it('should create a city', async () => {
    const city = {
      'name': 'xuva',
      'state': 'SC'
    };
    const response = await request(app).post('/cidade').send(city);

    expect(response.status).toBe(201);
  });
});

describe('This test try to insert an existent city', () => {
  it('should return a bad request (400)', async () => {
    const city1 = {
      'name': 'insanen123445ow',
      'state': 'SC'
    };
    const city2 = {
      'name': 'insanen123445ow',
      'state': 'SC'
    };
    let response = await request(app).post('/cidade').send(city1);

    expect(response.status).toBe(201);

    response = await request(app).post('/cidade').send(city1);
    expect(response.status).toBe(400);
  });
});

