import React from 'react'
import { useQuery, useMutation } from '@apollo/client'
import Note from '../components/Note'
import { GET_NOTE, GET_ME } from '../qql/queries'
import NoteForm from '../components/NoteForm'
import { EDIT_NOTE } from '../qql/mutation'
import { Redirect } from 'react-router'

const EditNote = (props) => {
  const id = props.match.params.id
  const { data, loading, error } = useQuery(GET_NOTE, {
    variables: {
      id,
    },
  })

  const { data: userdata } = useQuery(GET_ME)

  const [editNote] = useMutation(EDIT_NOTE, {
    variables: {
      id,
    },
    onCompleted: () => {
      props.history.push(`/note/${id}`)
    },
  })

  console.log(userdata)

  if (loading) return <p>Loading...</p>

  if (error) return <p>Error!</p>

  if (userdata && userdata.me.id !== data.note.author.id) {
    return <p>You do not have access to edit this note</p>
    // return <Redirect to={`/note/${id}`} />
  }

  return <NoteForm content={data.note.content} action={editNote} />
}

export default EditNote
