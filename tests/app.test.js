const http = require('http');
const app = require('../src/server');

describe('Static routes', () => {
  let server;
  let baseUrl;

  beforeAll((done) => {
    server = http.createServer(app);
    server.listen(0, () => {
      const addr = server.address();
      baseUrl = `http://127.0.0.1:${addr.port}`;
      done();
    });
  });

  afterAll((done) => {
    server.close(done);
  });

  test('GET / returns welcome page', async () => {
    const res = await fetch(baseUrl + '/');
    expect(res.status).toBe(200);
    const text = await res.text();
    expect(text).toMatch(/Welcome to the REST API Demo/);
  });

  test('GET /about returns about page', async () => {
    const res = await fetch(baseUrl + '/about');
    expect(res.status).toBe(200);
    const text = await res.text();
    expect(text).toMatch(/About this REST API Demo/);
  });
});
