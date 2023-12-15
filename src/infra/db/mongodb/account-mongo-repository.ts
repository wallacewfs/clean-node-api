import { MongoHelper } from '@/infra/db'
import { AccountModel } from '@/domain/models'
import { AddAccountRepository , LoadAccountByEmailRepository, UpdateAccessTokenRepository , LoadAccountByTokenRepository } from '@/data/protocols/db'
import { ObjectId } from 'mongodb'

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository, LoadAccountByTokenRepository {
  async add (data: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
    const accountCollection = await MongoHelper.getColletion('accounts')
    const result = await accountCollection.insertOne(data)
    const accountInserted = await accountCollection.findOne({ _id: result.insertedId })
    return MongoHelper.map(accountInserted)
  }

  async loadByEmail (email: string): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getColletion('accounts')
    const account = await accountCollection.findOne({ email })
    return account && MongoHelper.map(account)
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
