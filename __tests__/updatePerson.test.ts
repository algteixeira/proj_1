import request from 'supertest';
import { app } from '../src/app';
import { connect } from "../src/infra/database/postgres";

beforeAll(async() => {
    await connect();
});


describe('This test should run fine and', () => {
  it('should return a person updated with the given name', async () => {
    const personMock = {
        'name' : 'bulla'
    }
    const response = await request(app).put('/pessoa/098f5b32-c2ea-494c-abbc-c0069764a511').send(personMock);

    expect(response.status).toBe(200);
  });
});


describe('This test uses an unexistent id and', () => {
    it('should return a notFound(404)', async () => {
        const personMock = {
            'name' : 'testinho'
        }
      const response = await request(app).put('/pessoa/6c026b47-9fa6-4104-9860-6e61f51f1ff8').send(personMock);
  
      expect(response.status).toBe(404);
    });
});

describe('This test ask an update with a non-acceptable type in the body', () => {
    it('should return a notFound(404)', async () => {
        const personMock = {
            'variola' : 'positivo'
        }
      const response = await request(app).put('/pessoa/117928ec-0735-4bf3-9990-90573ebbc1e1').send(personMock);
  
      expect(response.status).toBe(400);
    });
});

describe('This test have an invalid id format and', () => {
    it('should return a bad request (400) error', async () => {
        const personMock = {
            'name' : 'testei'
        }
      const response = await request(app).put('/pessoa/117928ec-0735-4bf3-9990-90573ebbc1z1').send(personMock);
  
      expect(response.status).toBe(400);
    });
});

