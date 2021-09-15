import React, { useState } from 'react'
import { useEffect } from 'react'
import { useMutation, useApolloClient, gql } from '@apollo/client'
import UserForm from '../components/UserForm'
import Button from '../components/Button'

const SIGNUP_USER = gql`
  mutation signUp($email: String!, $username: String!, $password: String!) {
    signUp(email: $email, username: $username, password: $password)
  }
`

const Signup = (props) => {
  const client = useApolloClient()

  const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
    onCompleted: (data) => {
      localStorage.setItem('token', data.signUp)
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
  useEffect(() => {
    document.title = 'Sign Up — Notedly'
  }, [])

  return (
    <>
      <UserForm action={signUp} formType="signup" />
      {loading && <p>Loading...</p>}
      {error && <p>Error creating an account!</p>}
    </>
  )
}

export default Signup
