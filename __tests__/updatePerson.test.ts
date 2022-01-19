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

describe('Controllers / PersonController / update', () => {
  test('should return a person updated with the given name', async () => {
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

    const personMock = {
      name: 'bulla',
    };
    response = await request(app)
      .put(`/pessoa/${response.body.id}`)
      .send(personMock);

    expect(response.body.name).toBe('bulla');

    expect(response.status).toBe(200);
  });

  test('should return a notFound(404) because person was not created', async () => {
    const personMock = {
      name: 'testinho',
    };
    const response = await request(app)
      .put('/pessoa/6c026b47-9fa6-4104-9860-6e61f51f1ff8')
      .send(personMock);

    expect(response.body).toBe(`testinho haven't been found in the database.`);

    expect(response.status).toBe(404);
  });

  test('should return a badRequest(400) because variola is not a valid field', async () => {
    const personMock = {
      variola: 'positivo',
    };
    const response = await request(app)
      .put('/pessoa/117928ec-0735-4bf3-9990-90573ebbc1e1')
      .send(personMock);
    expect(response.body.details[1].message).toBe('"variola" is not allowed');
    expect(response.status).toBe(400);
  });

  test('should return a bad request (400) error because of wrong id format', async () => {
    const personMock = {
      name: 'testei',
    };
    const response = await request(app)
      .put('/pessoa/117928ec-0735-4bf3-9990-90573ebbc1z1')
      .send(personMock);
    expect(response.body.details[0].message).toBe(
      '"id" with value "117928ec-0735-4bf3-9990-90573ebbc1z1" fails to match the required pattern: /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/',
    );
    expect(response.status).toBe(400);
  });
});
