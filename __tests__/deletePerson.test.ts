import request from 'supertest';
import { app } from '../src/app';
import { connect } from "../src/infra/database/postgres";

beforeAll(async() => {
    await connect();
});


describe('This test should delete a person and', () => {
  it('should return an empty body with 204 statuscode', async () => {
    const response = await request(app).delete('/pessoa/9df859a7-602d-4262-a8a3-c62dd0c73a11');

    expect(response.status).toBe(204);
  });
});


describe('This test gives an unexistent id and', () => {
    it('should return a 404 not found error', async () => {
      const response = await request(app).get('/pessoa/7b82d9f6-0ddf-4fac-abb8-404a158bd876');
  
      expect(response.status).toBe(404);
    });
});

describe('This test should go wrong, because', () => {
    it('have an invalid id format', async () => {
      const response = await request(app).get('/pessoa/7b82d9f6-0dzy-4fac-abb8-404a158bd866');
  
      expect(response.status).toBe(400);
    });
});

