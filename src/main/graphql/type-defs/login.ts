import { gql } from 'apollo-server-express'

export default gql`
  type Query {
    login (email: String!, password: String!): Account!
  }

  type Mutation {
    signUp (name: String!, email: String!, password: String!, passwordConfirmation: String!): Account!
  }

  type Account {
    accessToken: String!
    name: String!
  }
`
