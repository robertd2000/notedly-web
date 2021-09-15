import React from 'react'
import ReactMarkdown from 'react-markdown'
import { format, parseISO } from 'date-fns'
import { useQuery } from '@apollo/client'
import styled from 'styled-components'
import NoteUser from './NoteUser'
import { IS_LOGGED_IN } from '../qql/queries'

const StyledNote = styled.article`
  max-width: 800px;
  margin: 0 auto;
`
// Стилизуем метаданные заметки
const MetaData = styled.div`
  @media (min-width: 500px) {
    display: flex;
    align-items: top;
  }
`
// Добавляем пространство между аватаром и метаданными
const MetaInfo = styled.div`
  padding-right: 1em;
`
// Выравниваем 'UserActions' по правой стороне на больших экранах
const UserActions = styled.div`
  margin-left: auto;
`

const Note = ({ note }) => {
  const { data, loading, error } = useQuery(IS_LOGGED_IN)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error!</p>

  return (
    <StyledNote>
      <MetaData>
        <MetaInfo>
          <img
            src={note.author.avatar}
            alt={`${note.author.username} avatar`}
            height="50px"
          />{' '}
        </MetaInfo>
        <MetaInfo>
          <em>by</em> {note.author.username} <br />
          {format(parseISO(note.createdAt), 'dd/MM/yyyy')}
        </MetaInfo>
        {data.isLoggedIn ? (
          <UserActions>
            <NoteUser note={note} />
          </UserActions>
        ) : (
          <UserActions>
            <em>Favorites:</em> {note.favoriteCount}
          </UserActions>
        )}
      </MetaData>
      {/* <ReactMarkdown source={note.content} /> */}
      <ReactMarkdown>{note.content}</ReactMarkdown>
    </StyledNote>
  )
}
export default Note
