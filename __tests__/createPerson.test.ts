import request from 'supertest';
import { getConnection } from 'typeorm';
import { app } from '../src/app';
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
  it('should create a person', async () => {
    const city = {
      'name': 'Pelotas',
      'state': 'RS'
    };
    let response = await request(app).post('/cidade').send(city);

    expect(response.status).toBe(201);
    const { id } = response.body;
    const pessoa = {
      'name': 'jota',
      'birthday': '19/08/1997',
      'city_id': id,
      'sex' : 'MASCULINO'
    };
    response = await request(app).post('/pessoa').send(pessoa);

    expect(response.status).toBe(201);
  });
});

describe('This test try to create a person with wrong atributes', () => {
  it('should create a person', async () => {
    const city = {
      'name': 'Pelotas',
      'state': 'RS'
    };
    let response = await request(app).post('/cidade').send(city);

    expect(response.status).toBe(201);
    const { id } = response.body;
    const pessoa = {
      'name': 'jota',
      'chuveiro': 'dont have',
      'birthday': '19/08/1997',
      'city_id': id,
      'sex' : 'MASCULINO'
    };
    response = await request(app).post('/pessoa').send(pessoa);

    expect(response.status).toBe(400);
  });
});

describe('This test uses an unexistent city and', () => {
  it('should return a bad request (400)', async () => {
    const pessoa = {
      'name': 'jota',
      'birthday': '19/08/1997',
      'city_id': '0aaaf282-c39b-4ae0-827c-3b16d09caa0d',
      'sex' : 'MASCULINO'
    };
    const response = await request(app).post('/pessoa').send(pessoa);

    expect(response.status).toBe(404);
  });
});