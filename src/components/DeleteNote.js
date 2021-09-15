import React from 'react'
import { useMutation } from '@apollo/client'
import { withRouter } from 'react-router-dom'

import { DELETE_NOTE } from '../qql/mutation'
import { GET_MY_NOTES, GET_NOTES } from '../qql/queries'

import ButtonAsLink from './ButtonAsLink'

const DeleteNote = (props) => {
  const [deleteNote] = useMutation(DELETE_NOTE, {
    variables: {
      id: props.noteId,
    },
    refetchQueries: [{ query: GET_MY_NOTES }, { query: GET_NOTES }],
    onCompleted: (data) => {
      props.history.push('/mynotes')
    },
  })
  return <ButtonAsLink onClick={deleteNote}>Delete Note</ButtonAsLink>
}
export default withRouter(DeleteNote)
