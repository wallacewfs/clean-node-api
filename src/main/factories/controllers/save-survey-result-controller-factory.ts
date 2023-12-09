import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { SaveSurveyResultController } from '@/presentation/controllers'
import { makeDbLoadSurveyById, makeDbSaveSurveyResult } from '@/main/factories/usecases'

export const makesaveSurveyResultController = (): Controller => {
  const controller = new SaveSurveyResultController(makeDbLoadSurveyById(), makeDbSaveSurveyResult())
  return makeLogControllerDecorator(controller)
}
