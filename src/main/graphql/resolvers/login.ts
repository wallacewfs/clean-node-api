import { adaptResolver } from '@/main/adapters'
import { makeLoginController, makeSignUpControle } from '@/main/factories'

export default {
  Query: {
    login: async (parent: any, args: any) => adaptResolver(makeLoginController(), args)
  },

  Mutation: {
    signUp: async (parent: any, args: any) => adaptResolver(makeSignUpControle(), args)
  }

}
