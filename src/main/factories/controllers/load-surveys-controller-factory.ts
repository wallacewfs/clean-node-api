import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator , makeDbLoadSurveys } from '@/main/factories'
import { LoadSurveysController } from '@/presentation/controllers'

export const makeLoadSurveyController = (): Controller => {
  const controller = new LoadSurveysController(makeDbLoadSurveys())
  return makeLogControllerDecorator(controller)
}
