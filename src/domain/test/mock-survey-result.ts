import { SaveSurveyResultParams } from '@/domain/usecases/survey-result/save-survey-result'
import { SurveyResultModel } from '@/domain/models/survey-result'

export const mockSurveyResultParams = (): SaveSurveyResultParams => ({
  accountId: 'any_account_id',
  surveyId: 'any_survey_id',
  answer: 'any_aswer',
  date: new Date()
})

export const mockSurveyResultModel = (): SurveyResultModel => Object.assign({}, mockSurveyResultParams(),{ id: 'any_id' })
