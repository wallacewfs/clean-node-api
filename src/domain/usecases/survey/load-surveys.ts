import { SurveyModel } from '@/domain/models/survey'

export interface LoadSurveys {
  load (accoundId: string): Promise<SurveyModel[] | null>
}
