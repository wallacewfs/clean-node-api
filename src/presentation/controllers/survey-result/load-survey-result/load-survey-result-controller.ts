import { Controller, HttpRequest, HttpResponse, LoadSurveyById } from './load-survey-result-controller-protocols'

export class LoadSurveyResultController implements Controller {
  constructor (private readonly loadSurveyById: LoadSurveyById) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.loadSurveyById.loadById(httpRequest.params.survdyId)
    return Promise.resolve(null)
  }
}
