import '../styles/global.css'

import { AppProps } from 'next/app'
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client'
import baseUrl from 'lib/urls'
import fetch from 'cross-fetch'

function App({ Component, pageProps }: AppProps): JSX.Element {
  const cleanTypeName = new ApolloLink((operation, forward) => {
    if (operation.variables) {
      const omitTypename = (key: string, value: any) =>
        key === '__typename' ? undefined : value
      operation.variables = JSON.parse(
        JSON.stringify(operation.variables),
        omitTypename
      )
    }
    return forward(operation).map((data) => {
      return data
    })
  })

  const httpLink = ApolloLink.from([
    cleanTypeName,
    new HttpLink({
      uri: `${baseUrl}/api/graphql`,
      fetch: fetch,
    }),
  ])

  const apolloClient = new ApolloClient({
    uri: `${baseUrl}/api/graphql`,
    cache: new InMemoryCache(),
    link: httpLink,
  })

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default App
