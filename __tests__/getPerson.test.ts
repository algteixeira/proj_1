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
  it('should return people', async () => {
    const response = await request(app).get('/cidade/?name=jota');

    expect(response.status).toBe(200);
  });
});


describe('This test should run fine but', () => {
    it('should return no one', async () => {
      const response = await request(app).get('/cidade/?name=francisco&page=1&limit=2');
  
      expect(response.status).toBe(200);
    });
});

describe('This test should go wrong, because', () => {
    it('have an invalid query', async () => {
      const response = await request(app).get('/cidade/?state=acaraje');
  
      expect(response.status).toBe(400);
    });
});

describe('This test should go wrong, because', () => {
  it('have an invalid query', async () => {
    const response = await request(app).get('/cidade/?alucination=acaraje&name=a');

    expect(response.status).toBe(400);
  });
});

