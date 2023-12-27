import { adaptResolver } from '@/main/adapters'
import { makeLoadSurveyResultController, makesaveSurveyResultController } from '@/main/factories'

export default {
  Query: {
    surveyResult: async (parent: any, args: any, context: any) => adaptResolver(makeLoadSurveyResultController(), args, context)
  },

  Mutation: {
    saveSurveyResult: async (parent: any, args: any, context: any) => adaptResolver(makesaveSurveyResultController(), args, context)
  }
}
