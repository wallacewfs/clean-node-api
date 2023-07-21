import { AddAccountRepository } from '../../../../data/protocols/db/add-account-repository'
import { AddAccountModel } from '../../../../domain/usecases/add-account'
import { AccountModel } from '../../../../domain/models/account'
import { MongoHelper } from '../helpers/mongo-helpers'
import { LoadAccountByEmailRepository } from '../../../../data/protocols/db/load-account-by-email-repository'
import { UpdateAccessTokenRepository } from '../../../../data/protocols/db/update-access-token-repository'
import { ObjectId } from 'mongodb'

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getColletion('accounts')
    const result = await accountCollection.insertOne(accountData)
    const accountInserted = await accountCollection.findOne({ _id: result.insertedId })
    return MongoHelper.map(accountInserted)
  }

  async loadbyEmail (email: string): Promise<AccountModel> {
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
}
