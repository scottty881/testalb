import { gql, useMutation } from '@apollo/client'
import { GraphQLError } from 'graphql'
import {
  UpdateLoanMutation,
  UpdateLoanMutation_updateLoan,
} from 'gql-api/__generated__/UpdateLoanMutation'

const UPDATE_LOAN = gql`
  mutation UpdateLoanMutation($id: Int!, $newStatus: LoanStatus!) {
    updateLoan(id: $id, newStatus: $newStatus) {
      id
      status
    }
  }
`

/**
 * Hook to update the status of a loan
 */
export function useUpdateLoan(): () => Promise<
  [loan?: UpdateLoanMutation_updateLoan, errors?: readonly GraphQLError[]]
> {
  const [openLoan] = useMutation<UpdateLoanMutation>(UPDATE_LOAN, {
    errorPolicy: 'all',
  })

  return async () => {
    const result = await openLoan()

    if (result.errors) {
      console.error(
        `Failed to open loan, errors: ${JSON.stringify(
          result.errors.map((e) => e.message)
        )}`
      )
      return [undefined, result.errors]
    }

    if (result.data) {
      return [result.data.updateLoan]
    }

    return [undefined, undefined]
  }
}
