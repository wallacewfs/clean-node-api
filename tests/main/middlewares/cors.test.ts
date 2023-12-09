import request from 'supertest'
import app from '@/main/config/app'

describe('Cors Middleware', () => {
  test('Should enable CORS', async () => {
    app.get('/test_cors', (req, res) => {
      res.send()
    })
    await request(app)
      .post('/test_body_parser')
      .expect('acces-control-allow-origin', '*')
      .expect('acces-control-allow-methods', '*')
      .expect('acces-control-allow-header', '*')
  })
})
