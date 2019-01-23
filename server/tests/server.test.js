const app = require('../server')
const testServer = require('supertest')

describe('testing user', () => {
  test('should protect the /user route', () => {
    testServer(app).get('/api/user')
      .then(response => {
        expect(response.statusCode).toBe(403)
      })
  })
})
