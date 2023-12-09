import { adaptRoute } from '@/main/adapters'
import { makeSignUpControle, makeLoginController } from '@/main/factories'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpControle()))
  router.post('/login', adaptRoute(makeLoginController()))
}
