import { MongoClient, Collection } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient,
  uri: null as string,

  async connect (uri?: string): Promise<void> {
    this.uri = uri
    this.client = await MongoClient.connect(uri)
  },

  async disconnect (): Promise<void> {
    await this.client.close()
    this.client = null
  },

  async getColletion (name: string): Promise<Collection> {
    if (!this.client) {
      await this.connect(this.uri)
    }
    return this.client.db().collection(name)
  },

  map: (collection: any): any => {
    const { _id, ...collectionWithoutId } = collection
    const collectionModel = {
      ...collectionWithoutId,
      id: _id.toHexString()
    }
    return collectionModel
  }
}
