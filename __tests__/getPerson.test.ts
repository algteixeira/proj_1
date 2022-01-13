import request from 'supertest';
import { app } from '../src/app';
import { connect } from "../src/infra/database/postgres";

beforeAll(async() => {
    await connect();
});


describe('This test should run fine', () => {
  it('should return people', async () => {
    const response = await request(app).get('/cidade/?name=jota');

    expect(response.status).toBe(200);
  });
});


describe('This test should run fine but', () => {
    it('should return no one', async () => {
      const response = await request(app).get('/cidade/?name=francisco');
  
      expect(response.status).toBe(200);
    });
});

describe('This test should go wrong, because', () => {
    it('have an invalid query', async () => {
      const response = await request(app).get('/cidade/?state=acaraje');
  
      expect(response.status).toBe(400);
    });
});

