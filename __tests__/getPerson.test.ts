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

describe('Controllers / PersonController / get', () => {
  test('should return no one', async () => {
    const response = await request(app).get(
      '/cidade/?name=francisco&page=1&limit=2',
    );
    expect(response.body.total).toBe(0);
    expect(response.status).toBe(200);
  });

  test('have an invalid query and should return 400 (bad parameters)', async () => {
    const response = await request(app).get('/cidade/?state=acaraje');
    expect(response.body.details[0].message).toBe(
      '"state" must be one of [AC, AL, AP, AM, BA, CE, DF, ES, GO, MA, MT, MS, MG, PA, PB, PR, PE, PI, RJ, RN, RS, RO, RR, SP, SC, SE, TO]',
    );
    expect(response.status).toBe(400);
  });

  test('have an invalid query', async () => {
    const response = await request(app).get(
      '/cidade/?alucination=acaraje&name=a',
    );

    expect(response.status).toBe(400);
  });
});
