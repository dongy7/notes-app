import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchNotes } from './notesSlice'

export const NotesList = () => {
  const dispatch = useDispatch()
  const notes = useSelector((state) => state.notes.notes)

  const notesStatus = useSelector((state) => state.notes.status)
  const error = useSelector((state) => state.notes.error)

  useEffect(() => {
    if (notesStatus === 'idle') {
      dispatch(fetchNotes())
    }
  }, [notesStatus, dispatch])

  let content

  if (notesStatus === 'loading') {
    content = <div>Loading...</div>
  } else if (notesStatus === 'succeeded') {
    const renderedNotes = notes.map((note) => (
      <tr key={note.id}>
        <td>{note.title}</td>
      </tr>
    ))

    content = (
      <table>
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>{renderedNotes}</tbody>
      </table>
    )
  } else if (notesStatus === 'failed') {
    return <div>{error}</div>
  }

  return <div>{content}</div>
}
