import { LoadSurveyByIdRepository, SurveyModel, LoadSurveyById } from './db-load-survey-by-protocols'

export class DbLoadSurveyById implements LoadSurveyById {
  constructor (private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository) {}
  async loadById (id: string): Promise<SurveyModel | null> {
    const survey = await this.loadSurveyByIdRepository.loadById(id)
    return survey
  }
}
