import Head from 'next/head'
import { useLoans } from 'gql-api/get-loans'
import SharedLayout from 'components/shared-layout'
import { asDollars } from '../lib/formatters'

export default function Home(): JSX.Element {
  const loans = useLoans()

  return (
    <SharedLayout>
      <Head>
        <title>Very Simple Loan Dashboard</title>
      </Head>
      <main className='flex-1 overflow-y-auto focus:outline-none'>
        <div className='relative max-w-6xl mx-auto md:px-8 xl:px-0'>
          <div className='pt-10 pb-16'>
            <div className='px-4 sm:px-6 md:px-0 pb-6'>
              <h1 className='text-3xl font-extrabold text-gray-900'>Loans</h1>
            </div>
            {loans && (
              <div className='flex flex-col'>
                <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                  <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
                    <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
                      <table className='min-w-full divide-y divide-gray-200'>
                        <thead className='bg-gray-50'>
                        <tr>
                          <th
                            scope='col'
                            className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                          >
                            Loan #
                          </th>
                          <th
                            scope='col'
                            className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                          >
                            Name
                          </th>
                          <th
                            scope='col'
                            className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                          >
                            Amount
                          </th>
                          <th
                            scope='col'
                            className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                          >
                            Status
                          </th>
                        </tr>
                        </thead>
                        <tbody className='bg-white divide-y divide-gray-200'>
                        {loans.map((loan) => (
                          <tr key={loan.id}>
                            <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{loan.id}</td>
                            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{loan.name}</td>
                            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{asDollars(loan.amount)}</td>
                            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{loan.status}</td>
                          </tr>
                        ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </SharedLayout>
  )
}
