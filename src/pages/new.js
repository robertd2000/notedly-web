import React, { useEffect } from 'react'
import { useMutation, gql } from '@apollo/client'
import NoteForm from '../components/NoteForm'
import { GET_NOTES, GET_MY_NOTES } from '../qql/queries'
import { NEW_NOTE } from '../qql/mutation'

const NewNote = (props) => {
  useEffect(() => {
    document.title = 'New Note — Notedly'
  }, [])
  const [data, { loading, error }] = useMutation(NEW_NOTE, {
    refetchQueries: [{ query: GET_NOTES }, { query: GET_MY_NOTES }],
    onCompleted: (d) => {
      props.history.push(`note/${d.newNote.id}`)
    },
  })

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Error saving the note</p>}
      <NoteForm action={data} />
    </>
  )
}

export default NewNote
