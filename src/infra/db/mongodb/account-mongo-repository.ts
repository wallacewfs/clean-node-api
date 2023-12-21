import { MongoHelper } from '@/infra/db'
import { AddAccountRepository , LoadAccountByEmailRepository, UpdateAccessTokenRepository , LoadAccountByTokenRepository, CheckAccountByEmailRepository } from '@/data/protocols/db'
import { ObjectId } from 'mongodb'

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository, LoadAccountByTokenRepository {
  async add (data: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
    const accountCollection = await MongoHelper.getColletion('accounts')
    const result = await accountCollection.insertOne(data)
    return result !== null
  }

  async loadByEmail (email: string): Promise<LoadAccountByEmailRepository.Result> {
    const accountCollection = await MongoHelper.getColletion('accounts')
    const account = await accountCollection.findOne({
      email
    }, {
      projection: {
        _id: 1,
        name: 1,
        password: 1
      }
    })
    return account && MongoHelper.map(account)
  }

  async checkByEmail (email: string): Promise<CheckAccountByEmailRepository.Result> {
    const accountCollection = await MongoHelper.getColletion('accounts')
    const account = await accountCollection.findOne({
      email
    }, {
      projection: {
        _id: 1
      }
    })
    return account !== null
  }

  async updateAccessToken (id: string, token: string): Promise<void> {
    const accountCollection = await MongoHelper.getColletion('accounts')
    await accountCollection.updateOne({
      _id: new ObjectId(id)
    }, {
      $set: {
        accessToken: token
      }
    })
  }

  async loadByToken (token: string, role?: string): Promise<LoadAccountByTokenRepository.Result | null> {
    const accountCollection = await MongoHelper.getColletion('accounts')
    const account = await accountCollection.findOne({
      accessToken: token,
      $or: [{
        role
      },{
        role: 'admin'
      }]
    },{
      projection: {
        _id: 1
      }
    })
    return account && MongoHelper.map(account)
  }
}
