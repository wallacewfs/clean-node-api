import typeDefs from '@/main/graphql/type-Defs'
import resolvers from '@/main/graphql/resolvers'
import { ApolloServer } from 'apollo-server-express'

export const setupApolloServer = (): ApolloServer => {
  return new ApolloServer({
    resolvers,
    typeDefs
  })
}
