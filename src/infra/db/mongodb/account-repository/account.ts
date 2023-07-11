import { AddAccountRepository } from '../../../../data/protocols/add-account-repository'
import { AddAccountModel } from '../../../../domain/usecases/add-account'
import { AccountModel } from '../../../../domain/models/account'
import { MongoHelper } from '../helpers/mongo-helpers'

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getColletion('accounts')
    const result = await accountCollection.insertOne(accountData)
    const accountInserted = await accountCollection.findOne({ _id: result.insertedId })
    const { _id, ...accountWithoutId } = accountInserted
    const account = {
      ...accountWithoutId as Omit<AccountModel, 'id'>,
      id: _id.toHexString()
    }
    return account
  }
}
