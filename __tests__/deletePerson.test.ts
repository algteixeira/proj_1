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


describe('This test should delete a person and', () => {
  test('should return an empty body with 204 statuscode', async () => {
    const city = {
      'name': 'Pelotas',
      'state': 'RS'
    };
    let response = await request(app).post('/cidade').send(city);

    expect(response.status).toBe(201);
    let { id } = response.body;
    const pessoa = {
      'name': 'jota',
      'birthday': '19/08/1997',
      'city_id': id,
      'sex' : 'MASCULINO'
    };
    response = await request(app).post('/pessoa').send(pessoa);

    expect(response.status).toBe(201);

    response = await request(app).delete(`/pessoa/${response.body.id}`);

    expect(response.status).toBe(204);
  });
});


describe('This test gives an unexistent id and', () => {
    test('should return a 404 not found error', async () => {
      const response = await request(app).get('/pessoa/7b82d9f6-0ddf-4fac-abb8-404a158bd876');
      expect(response.body).toBe(`7b82d9f6-0ddf-4fac-abb8-404a158bd876 haven't been found in the database.`);
      expect(response.status).toBe(404);
    });
});

describe('This test should go wrong, because', () => {
    test('have an invalid id format', async () => {
      const response = await request(app).get('/pessoa/7b82d9f6-0dzy-4fac-abb8-404a158bd866');
  
      expect(response.status).toBe(400);
    });
});

