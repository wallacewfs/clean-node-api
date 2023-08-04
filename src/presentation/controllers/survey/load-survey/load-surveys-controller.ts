import { Controller, HttpRequest, HttpResponse, LoadSurveys } from './load-survey-controller-protocols'
import { ok } from '../../../helpers/http/http-helpers'

export class LoadSurveysController implements Controller {
  constructor (private readonly loadSurveys: LoadSurveys) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const surveys = await this.loadSurveys.load()
    return ok(surveys)
  }
}
