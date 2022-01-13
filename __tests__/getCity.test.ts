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
  it('should return cities', async () => {
    const response = await request(app).get('/cidade/?name=Pelotas');

    expect(response.status).toBe(200);
  });
});


describe('This test should run fine', () => {
    it('should return cities', async () => {
      const response = await request(app).get('/cidade/?state=RS');
  
      expect(response.status).toBe(200);
    });
});

describe('This test should run fine', () => {
  it('should return cities', async () => {
    const response = await request(app).get('/cidade/?state=RS&limit=5&page=1');

    expect(response.status).toBe(200);
  });
});

describe('This test should go wrong', () => {
    it('have an invalid state', async () => {
      const response = await request(app).get('/cidade/?state=acaraje');
  
      expect(response.status).toBe(400);
    });
});

describe('This test should go wrong', () => {
    it('have an invalid query', async () => {
      const response = await request(app).get('/cidade/?felipe=santos');
  
      expect(response.status).toBe(400);
    });
});