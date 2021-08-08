import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { format, parseISO } from 'date-fns'

import {
  fetchNotes,
  deleteNote,
  selectAllNotes,
  selectNoteById,
  selectSearchQuery,
} from './notesSlice'

const NoteInfo = ({ noteId }) => {
  const dispatch = useDispatch()

  const note = useSelector((state) => selectNoteById(state, noteId))
  const onDeleteClicked = async () => {
    try {
      const resultAction = await dispatch(deleteNote(noteId))
      unwrapResult(resultAction)
    } catch (err) {}
  }

  return (
    <tr>
      <td>{note.title}</td>
      <td>{format(parseISO(note.date), 'MM/dd/yyyy hh:mm aaa')}</td>
      <td>
        <Link to={`/edit/${note.id}`} className="icon">
          <FontAwesomeIcon icon={faEdit} />
        </Link>
        <FontAwesomeIcon
          icon={faTimes}
          onClick={onDeleteClicked}
          className="icon"
        />
      </td>
    </tr>
  )
}

export const NotesList = () => {
  const dispatch = useDispatch()

  const notesStatus = useSelector((state) => state.notes.loadStatus)
  const error = useSelector((state) => state.notes.loadError)

  const filteredNotes = useSelector((state) => {
    const allNotes = selectAllNotes(state)
    const searchQuery = selectSearchQuery(state)
    return allNotes.filter((note) => {
      if (!searchQuery) {
        return true
      }

      return note.title.toLowerCase().includes(searchQuery)
    })
  })

  useEffect(() => {
    if (notesStatus === 'idle') {
      dispatch(fetchNotes())
    }
  }, [notesStatus, dispatch])

  let content

  if (notesStatus === 'loading') {
    content = <div className="loader">Loading...</div>
  } else if (notesStatus === 'succeeded') {
    const renderedNotes = filteredNotes.map((note) => (
      <NoteInfo key={note.id} noteId={note.id} />
    ))

    content = (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Modified</th>
            <th></th>
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
