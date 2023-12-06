import { SurveyResultModel } from '@/domain/models/survey-result'

export interface LoadSurveyResultRepository {
  loadBySurveyId (surveyId: string, accountId: String): Promise<SurveyResultModel>
}
