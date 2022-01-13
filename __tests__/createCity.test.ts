import request from 'supertest';
import { app } from '../src/app';
import { connect } from "../src/infra/database/postgres";

beforeAll(async() => {
    await connect();
});


describe('This test should run fine', () => {
  it('should create a city', async () => {
    const city = {
      'name': 'insanen123445ow',
      'state': 'SC'
    };
    const response = await request(app).post('/cidade').send(city);

    expect(response.status).toBe(201);
  });
});

describe('This test try to insert an existent city', () => {
  it('should return a bad request (400)', async () => {
    const city = {
      'name': 'insanen123445ow',
      'state': 'SC'
    };
    const response = await request(app).post('/cidade').send(city);

    expect(response.status).toBe(400);
  });
});