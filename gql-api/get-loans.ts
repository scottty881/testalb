import { gql, useQuery } from '@apollo/client'
import { GetLoans, GetLoans_loans } from 'gql-api/__generated__/GetLoans'

export const GET_LOANS = gql`
  query GetLoans {
    loans {
      id
      name
      status
      amount
    }
  }
`

export type Loan = GetLoans_loans

/**
 * A hook which returns all the loans in the db
 *
 * @return {Loan[]} a list of loans
 */
export function useLoans(): Loan[] {
  const { data, error } = useQuery<GetLoans>(GET_LOANS, {
    fetchPolicy: 'cache-and-network',
  })

  if (error) {
    console.error('Failed to get loans ', error)
  }

  if (data && data.loans) {
    return data.loans
  }

  return []
}
