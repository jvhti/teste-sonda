const request = require('supertest');
const app = require('../app');

describe('Probe Endpoints', () => {
  describe("POST /probe", () => {
    it('should throw an error if the type doesn\'t exists', async function () {
      const res = await request(app).post('/probe').send({type: 'NOT_FOUND'});
      expect(res.statusCode).toStrictEqual(500);
      expect(res.body).toHaveProperty('error');
    });

    it('should use \'Standard\' as default type', async function () {
      const res = await request(app).post('/probe').send();
      expect(res.statusCode).toStrictEqual(201);
      expect(res.body).toHaveProperty('type');
      expect(res.body.type).toStrictEqual('Standard');
    });

    it('should create a new probe', async function () {
      const res = await request(app).post('/probe').send({type: 'Standard'});
      expect(res.statusCode).toStrictEqual(201);
      expect(res.body).toHaveProperty('probe');
      expect(res.body).toHaveProperty('id');
      expect(res.body).toHaveProperty('type');

      expect(res.body.type).toStrictEqual('Standard');
      expect(res.body.id).toStrictEqual(0);
    });
  });
});
