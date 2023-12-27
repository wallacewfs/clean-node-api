import { adaptResolver } from '@/main/adapters'
import { makeLoadSurveyController } from '@/main/factories'

export default {
  Query: {
    surveys: async () => adaptResolver(makeLoadSurveyController())
  }

}
