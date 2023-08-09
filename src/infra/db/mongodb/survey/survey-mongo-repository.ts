import { MongoHelper } from '../helpers/mongo-helpers'
import { SurveyModel } from '@/domain/models/survey'
import { LoadSurveysRepository } from '@/data/protocols/db/survey/load-survey-repository'
import { AddSurveyModel, AddSurveyRepository } from '@/data/usecases/add-survey/db-add-survey-protocols'
import { LoadSurveyByIdRepository } from '@/data/usecases/load-survey-by-id/db-load-survey-by-protocols'
import { ObjectId } from 'mongodb'

export class SurveyMongoRepository implements AddSurveyRepository, LoadSurveysRepository, LoadSurveyByIdRepository {
  async add (surveyData: AddSurveyModel): Promise<void> {
    const surveyCollection = await MongoHelper.getColletion('surveys')
    const result = await surveyCollection.insertOne(surveyData)
    await surveyCollection.findOne({ _id: result.insertedId })
  }

  async loadAll (): Promise<SurveyModel[]> {
    const surveyCollection = await MongoHelper.getColletion('surveys')
    const surveys = await surveyCollection.find().toArray()
    return MongoHelper.mapCollection(surveys)
  }

  async loadById (id: string): Promise<SurveyModel> {
    const surveyCollection = await MongoHelper.getColletion('surveys')
    const survey = await surveyCollection.findOne({ _id: new ObjectId(id) })
    return survey && MongoHelper.map(survey)
  }
}
