import { LoadSurveyResult } from '@/domain/usecases'
import { DbLoadSurveyResult } from '@/data/usecases'
import { SurveyResultMongoRepository, SurveyMongoRepository } from '@/infra/db'

export const makeDbLoadSurveyResult = (): LoadSurveyResult => {
  const surveyResultMongoRepository = new SurveyResultMongoRepository()
  const loadSurveyResultMongoRepository = new SurveyMongoRepository()
  return new DbLoadSurveyResult(surveyResultMongoRepository,loadSurveyResultMongoRepository)
}
