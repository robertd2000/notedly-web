import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'

import Layout from '../components/Layout'
import Home from './home'
import MyNotes from './mynotes'
import Favorites from './favorites'
import NotePage from './note'
import SignUp from './signup'
import SignIn from './singin'
import NewNote from './new'
import EditNote from './edit'
import { IS_LOGGED_IN } from '../qql/queries'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { data, loading, error } = useQuery(IS_LOGGED_IN)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error!</p>

  return (
    <Route
      {...rest}
      render={(props) =>
        data.isLoggedIn === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  )
}
const Pages = () => {
  return (
    <Router>
      <Layout>
        <Route exact path="/" component={Home} />
        <PrivateRoute path="/mynotes" component={MyNotes} />
        <PrivateRoute path="/favorites" component={Favorites} />
        <Route path="/note/:id" component={NotePage} />
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />
        <PrivateRoute path="/new" component={NewNote} />
        <PrivateRoute path="/edit/:id" component={EditNote} />
      </Layout>
    </Router>
  )
}

export default Pages
