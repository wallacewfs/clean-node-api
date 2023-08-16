import { SurveyResultModel } from '@/domain/models/survey-result'

export interface loadSurveyResult {
  save (surveyId: string): Promise<SurveyResultModel | null>
}
