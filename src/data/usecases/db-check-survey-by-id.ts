import { CheckSurveyById } from '@/domain/usecases'
import { CheckSurveyByIdRepository } from '@/data/protocols'

export class DbCheckSurveyById implements CheckSurveyById {
  constructor (private readonly checkSurveyByIdRepository: CheckSurveyByIdRepository) {}
  async checkById (id: string): Promise<CheckSurveyById.Result | null> {
    const survey = await this.checkSurveyByIdRepository.checkById(id)
    return survey
  }
}
