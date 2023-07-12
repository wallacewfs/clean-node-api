import request from 'supertest'
import app from '../config/app'

describe('SignUp Routes', () => {
  test('Should return an account on sucess', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Rodrigo',
        email: 'rodirgo.manguinho@gmail.com',
        password: '123',
        passwordConfirmation: '123'
      })
      .expect(200)
  })
})
