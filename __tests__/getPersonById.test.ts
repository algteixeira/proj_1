import request from 'supertest';
import { app } from '../src/app';
import { connect } from "../src/infra/database/postgres";

beforeAll(async() => {
    await connect();
});


describe('This test should run fine and', () => {
  it('should return a person', async () => {
    const response = await request(app).get('/pessoa/767093e9-5f87-402f-beea-005b520bb341');

    expect(response.status).toBe(200);
  });
});


describe('This test uses an unexistent id and', () => {
    it('should return a notFound(404)', async () => {
      const response = await request(app).get('/pessoa/117928ec-0735-4bf3-9990-90573ebbc1c1');
  
      expect(response.status).toBe(404);
    });
});

describe('This test have an invalid id format and', () => {
    it('should return a bad request (400) error', async () => {
      const response = await request(app).get('/pessoa/117928ec-0735-4bf3-9990-90573ebbc1z1');
  
      expect(response.status).toBe(400);
    });
});

