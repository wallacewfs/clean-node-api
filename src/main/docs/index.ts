import { loginPath } from './paths'
import { accountSchema, errorSchema, loginParamstSchema } from './schemas'
import { badRequest, notFound, serverError, unauthorized } from './components'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Clean Node API',
    description: 'API do curso do Mango para realizar enquetes entre programadores',
    version: '1.0.0',
    contact: {
      name: 'Wallace Silva',
      email: 'wallacef@gmail.com',
      url: 'https://www.linkedin.com/in/wallacewfs/'
    }
  },
  license: {
    name: 'GPL-3.0-or-later',
    url: 'https://spdx.org/licenses/GPL-3.0-or-later.html'
  },
  servers: [{
    url: '/api'
  }],
  tags: [{
    name: 'login'
  }],
  paths: {
    '/login': loginPath
  },
  schemas: {
    account: accountSchema,
    loginParams: loginParamstSchema,
    error: errorSchema
  },
  components: {
    badRequest,
    serverError,
    unauthorized,
    notFound
  }
}
