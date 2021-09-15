import {
  MutationResolvers,
  QueryResolvers,
  Resolvers,
} from 'graphql/__generated__/resolvers-types'

const queryResolvers: QueryResolvers = {
  loans: (parent, args) => {
    return [
      { id: 1, name: 'Allison Huynh', status: 'open', amount: 101 },
      { id: 2, name: 'Derek Faulkner', status: 'open', amount: 102 },
      { id: 3, name: 'Evelyn Cordner', status: 'open', amount: 103 },
      { id: 4, name: 'Mark Shaw', status: 'open', amount: 104 },
    ]
  },
}

const mutationResolvers: MutationResolvers = {
  updateLoan: (parent, args) => {
    return { id: 1, name: 'Allison Huynh', status: args.newStatus, amount: 100 }
  },
}

const loanResolvers: Resolvers = {
  Query: queryResolvers,
  Mutation: mutationResolvers,
}

const resolvers = [loanResolvers]

export default resolvers
