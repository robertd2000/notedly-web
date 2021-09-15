import React, { useEffect } from 'react'
import { useMutation, useApolloClient, gql } from '@apollo/client'
import UserForm from '../components/UserForm'
import { SIGNIN_USER } from '../qql/mutation'

const SingIn = (props) => {
  useEffect(() => {
    document.title = 'Sign In — Notedly'
  }, [])

  const client = useApolloClient()
  const [singIn, { error, loading }] = useMutation(SIGNIN_USER, {
    onCompleted: (data) => {
      localStorage.setItem('token', data.signIn)
      client.writeQuery({
        query: gql`
          query {
            isLoggedIn
          }
        `,
        data: {
          isLoggedIn: true,
        },
      })
      props.history.push('/')
    },
  })

  return (
    <div>
      <UserForm action={singIn} formType="signIn" />
      {loading && <p>Loading...</p>}
      {error && <p>Error creating an account!</p>}
    </div>
  )
}

export default SingIn
