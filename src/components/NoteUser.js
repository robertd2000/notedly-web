import React from 'react'
import { useQuery, gql } from '@apollo/client'
import { Link } from 'react-router-dom'

import { GET_ME } from '../qql/queries'
import DeleteNote from './DeleteNote'
import FavoriteNote from './FavoriteNote'

const NoteUser = (props) => {
  const { data, loading, error } = useQuery(GET_ME)

  if (loading) return <p>Loading...</p>

  if (error) return <p>Error!</p>

  return (
    <>
      <FavoriteNote
        me={data.me}
        noteId={props.note.id}
        favoriteCount={props.note.favoriteCount}
      />
      <br />
      {data.me.id === props.note.author.id && (
        <>
          <Link to={`/edit/${props.note.id}`}>Edit</Link>{' '}
          <DeleteNote noteId={props.note.id} />
        </>
      )}
    </>
  )
}
export default NoteUser
