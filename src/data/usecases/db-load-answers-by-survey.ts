import { LoadAnswersBySurvey } from '@/domain/usecases'
import { LoadAnswersBySurveyRepository } from '@/data/protocols'

export class DbLoadAnswersBySurvey implements LoadAnswersBySurvey {
  constructor (private readonly loadAnswersBySurveydRepository: LoadAnswersBySurveyRepository) {}

  async loadAnswers (id: string): Promise<LoadAnswersBySurvey.Result | null> {
    return await this.loadAnswersBySurveydRepository.loadAnswers(id)
  }
}
