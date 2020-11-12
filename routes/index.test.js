const request = require('supertest');
const session = require('supertest-session');
const app = require('../app');

const directionDictionary = require('../utils/directionMapper').dictionary;

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

  describe('DELETE /probe', () => {
    it('should return a 404 if the probe wasn\'t created', async function () {
      const res = await request(app).delete('/probe').send();
      expect(res.statusCode).toStrictEqual(404);
    });

    it('should delete the probe if it already exists', async function () {
      const testSesssion = session(app);

      await testSesssion.post('/probe').send();
      const res = await testSesssion.delete('/probe').send();

      expect(res.statusCode).toStrictEqual(200);
      expect(res.body).toHaveProperty('probe');
      expect(res.body).toHaveProperty('deleted');
      expect(res.body.deleted).toBeTruthy();
    });
  });

  describe('GET /probe', () => {
    it('should return a 404 if the probe wasn\'t created', async function () {
      const res = await request(app).get('/probe').send();
      expect(res.statusCode).toStrictEqual(404);
    });

    it('should delete the probe if it already exists', async function () {
      const testSesssion = session(app);

      await testSesssion.post('/probe').send();
      const res = await testSesssion.get('/probe').send();

      expect(res.statusCode).toStrictEqual(200);
      expect(res.body).toHaveProperty('x');
      expect(res.body).toHaveProperty('y');
      expect(res.body).toHaveProperty('face');
      expect(res.body.x).not.toBeNaN();
      expect(res.body.y).not.toBeNaN();
      expect(Object.keys(directionDictionary)).toContain(res.body.face);
    });
  });
});
