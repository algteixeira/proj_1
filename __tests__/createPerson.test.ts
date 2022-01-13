import request from 'supertest';
import { app } from '../src/app';
import { connect } from "../src/infra/database/postgres";

beforeAll(async() => {
    await connect();
});


describe('This test should run fine', () => {
  it('should create a person', async () => {
    const pessoa = {
      'name': 'jota',
      'birthday': '19/08/1997',
      'city_id': '0feef282-c39b-4be0-827c-3b16d09cee0d',
      'sex' : 'MASCULINO'
    };
    const response = await request(app).post('/pessoa').send(pessoa);

    expect(response.status).toBe(201);
  });
});

describe('This test uses an unexistent city and', () => {
  it('should return a bad request (400)', async () => {
    const pessoa = {
      'name': 'jota',
      'birthday': '19/08/1997',
      'city_id': '0faef282-c39b-4be0-827c-3b16d09cee0d',
      'sex' : 'MASCULINO'
    };
    const response = await request(app).post('/pessoa').send(pessoa);

    expect(response.status).toBe(400);
  });
});