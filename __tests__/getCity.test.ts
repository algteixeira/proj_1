import request from 'supertest';
import { app } from '../src/app';
import { connect } from "../src/infra/database/postgres";

beforeAll(async() => {
    await connect();
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