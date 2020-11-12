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
      const testSession = session(app);

      await testSession.post('/probe').send();
      const res = await testSession.delete('/probe').send();

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
      const testSession = session(app);

      await testSession.post('/probe').send();
      const res = await testSession.get('/probe').send();

      expect(res.statusCode).toStrictEqual(200);
      expect(res.body).toHaveProperty('x');
      expect(res.body).toHaveProperty('y');
      expect(res.body).toHaveProperty('face');
      expect(res.body.x).not.toBeNaN();
      expect(res.body.y).not.toBeNaN();
      expect(Object.keys(directionDictionary)).toContain(res.body.face);
    });
  });

  describe('PUT /probe', () => {
    it('should return a 404 if the probe wasn\'t created', async function () {
      const res = await request(app).put('/probe').send({movements: ['M']});
      expect(res.statusCode).toStrictEqual(404);
    });

    it('should throw error if doesn\'t have movements array', async function () {
      const testSession = session(app);

      await testSession.post('/probe').send();
      const res = await testSession.put('/probe').send({asdasd: ['sadfs']});

      expect(res.body).toHaveProperty('error');
      expect(res.statusCode).toStrictEqual(400);
    });

    it('should throw error if the commands are unknown', async function () {
      const testSession = session(app);

      await testSession.post('/probe').send();
      const res = await testSession.put('/probe').send({movementos: ['S']});

      expect(res.body).toHaveProperty('error');
    });

    it('should move forward', async function () {
      const testSession = session(app);

      await testSession.post('/probe').send();
      const res = await testSession.put('/probe').send({movementos: ['M']});

      expect(res.body).toHaveProperty('x');
      expect(res.body).toHaveProperty('y');

      expect(res.body.x).not.toBeNaN();
      expect(res.body.y).not.toBeNaN();

      expect(res.body.x).toStrictEqual(1);
      expect(res.body.y).toStrictEqual(0);
    });

    it('should run multiple commands', async function () {
      const testSession = session(app);

      await testSession.post('/probe').send();
      const res = await testSession.put('/probe').send({movementos: ['M', 'M']});

      expect(res.body).toHaveProperty('x');
      expect(res.body).toHaveProperty('y');

      expect(res.body.x).not.toBeNaN();
      expect(res.body.y).not.toBeNaN();

      expect(res.body.x).toStrictEqual(2);
      expect(res.body.y).toStrictEqual(0);
    });

    it('should run the example', async function () {
      const testSession = session(app);

      await testSession.post('/probe').send();
      const res = await testSession.put('/probe').send({movementos: ['GE', 'M', 'M', 'M', 'GD', 'M', 'M']});

      expect(res.body.x).toStrictEqual(2);
      expect(res.body.y).toStrictEqual(3);
    });

    it('should run the example that is out of bounds', async function () {
      const testSession = session(app);

      await testSession.post('/probe').send();
      const res = await testSession.put('/probe').send({movementos: ['M', 'M', 'M', 'M', 'M', 'M']});

      expect(res.body).toHaveProperty('error');
    });
  });

  describe('PUT /probe/undo', () => {
    it('should return a 404 if the probe wasn\'t created', async function () {
      const res = await request(app).put('/probe/undo').send();
      expect(res.statusCode).toStrictEqual(404);
    });

    it('should rollback multiple commands', async function () {
      const testSession = session(app);

      await testSession.post('/probe').send();
      const res = await testSession.put('/probe').send({movementos: ['M', 'M', 'M']});

      expect(res.body).toHaveProperty('x');
      expect(res.body).toHaveProperty('y');

      expect(res.body.x).not.toBeNaN();
      expect(res.body.y).not.toBeNaN();

      expect(res.body.x).toStrictEqual(3);
      expect(res.body.y).toStrictEqual(0);

      const res1 = await testSession.put('/probe/undo').send();

      expect(res1.body.x).toStrictEqual(2);
      expect(res1.body.y).toStrictEqual(0);

      const res2 = await testSession.put('/probe/undo').send();

      expect(res2.body.x).toStrictEqual(1);
      expect(res2.body.y).toStrictEqual(0);

      const res3 = await testSession.put('/probe/undo').send();

      expect(res3.body.x).toStrictEqual(0);
      expect(res3.body.y).toStrictEqual(0);
    });

    it('should throw error if there are nothing to return', async function () {
      const testSession = session(app);

      await testSession.post('/probe').send();
      const res = await testSession.put('/probe/undo').send();

      expect(res.statusCode).toStrictEqual(404);
      expect(res.body).toHaveProperty('error');
    });
  });
});

