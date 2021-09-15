// Placeholder so we can extend Query and Mutation in other typedef files
import { gql } from 'apollo-server-micro'

const root = gql`
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`

const loan = gql`
  enum LoanStatus {
    open
    approved
    activated
    closed
  }

  extend type Query {
    loans(status: LoanStatus): [Loan!]
  }

  extend type Mutation {
    updateLoan(id: Int!, newStatus: LoanStatus!): Loan!
  }

  type Loan {
    id: Int!
    name: String!
    status: LoanStatus!
    amount: Int!
  }
`

export const typeDefs = [root, loan]
