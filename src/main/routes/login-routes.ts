import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { makeSignUpControle } from '@/main/factories/controllers/login/signup/signup-controller-factory'
import { makeLoginController } from '@/main/factories/controllers/login/login/login-controller-factory'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpControle()))
  router.post('/login', adaptRoute(makeLoginController()))
}
