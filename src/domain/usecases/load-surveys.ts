import { SurveyModel } from '@/domain/models/survey'

export interface LoadSurveys {
  load (accoundId: string): Promise<LoadSurveys.Result | null>
}

export namespace LoadSurveys {
  export type Result = SurveyModel[]
}
