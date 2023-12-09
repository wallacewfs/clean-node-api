import { MongoHelper } from './mongo-helpers'
import { LogErrorRepository } from '@/data/protocols'

export class LogMongoRepository implements LogErrorRepository {
  async logError (stack: string): Promise<void> {
    const errorCollection = await MongoHelper.getColletion('errors')
    await errorCollection.insertOne({
      stack,
      date: new Date()
    })
  }
}
