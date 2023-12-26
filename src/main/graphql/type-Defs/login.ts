import { gql } from 'apollo-server-express'

export default gql`
  type Query {
    login (email: String!, password: String!): Account!
  }

  type Account {
    accessToken: String!
    name: String!
  }
`
