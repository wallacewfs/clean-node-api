import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator, makeDbLoadSurveyById , makeDbLoadSurveyResult } from '@/main/factories'
import { LoadSurveyResultController } from '@/presentation/controllers'

export const makeLoadSurveyResultController = (): Controller => {
  const controller = new LoadSurveyResultController(makeDbLoadSurveyById(), makeDbLoadSurveyResult())
  return makeLogControllerDecorator(controller)
}
