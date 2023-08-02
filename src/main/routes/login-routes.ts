import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeSignUpControle } from '../factories/controllers/login/signup/signup-controller-factory'
import { makeLoginController } from '../factories/controllers/login/login/login-controller-factory'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpControle()))
  router.post('/login', adaptRoute(makeLoginController()))
}
