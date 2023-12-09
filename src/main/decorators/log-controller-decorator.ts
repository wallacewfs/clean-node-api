import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { LogErrorRepository } from '@/data/protocols/db'

export class LogControllerDecorator implements Controller {
  constructor (
    private readonly controller: Controller,
    private readonly logErrorRepository: LogErrorRepository) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(httpRequest)
    if (httpResponse.statusCode === 500) {
      await this.logErrorRepository.logError(httpResponse.body.stack)
      console.log('fez o log')
    }
    return httpResponse
  }
}
