import './App.css'
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
  gql,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import Pages from './pages'
import GlobalStyle from './components/GlobalStyle'
import dotenv from 'dotenv'

dotenv.config()
const uri = process.env.API_URI || 'http://localhost:4000/api'
const httpLink = createHttpLink({ uri })
const cache = new InMemoryCache()

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      headers,
      authorization: localStorage.getItem('token') || '',
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  resolvers: {},
  connectToDevTools: true,
})

const data = {
  isLoggedIn: !!localStorage.getItem('token'),
}

cache.writeQuery({
  query: gql`
    query {
      isLoggedIn
    }
  `,
  data,
})

client.onResetStore(() =>
  cache.writeQuery({
    query: gql`
      query {
        isLoggedIn
      }
    `,
    data,
  })
)

function App() {
  return (
    <ApolloProvider client={client}>
      <GlobalStyle />
      <Pages />
    </ApolloProvider>
  )
}

export default App
