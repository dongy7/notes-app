import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

import { fetchNotes, deleteNote } from './notesSlice'

export const NotesList = () => {
  const dispatch = useDispatch()
  const notes = useSelector((state) => state.notes.notes)

  const notesStatus = useSelector((state) => state.notes.status)
  const error = useSelector((state) => state.notes.error)
  const searchQuery = useSelector((state) => state.notes.searchQuery)

  useEffect(() => {
    if (notesStatus === 'idle') {
      dispatch(fetchNotes())
    }
  }, [notesStatus, dispatch])

  const onDeleteClicked = async (id) => {
    try {
      const resultAction = await dispatch(deleteNote(id))
      unwrapResult(resultAction)
    } catch (err) {}
  }

  let content

  if (notesStatus === 'loading') {
    content = <div>Loading...</div>
  } else if (notesStatus === 'succeeded') {
    const renderedNotes = notes
      .filter((note) => {
        if (!searchQuery) {
          return true
        }

        return note.title.toLowerCase().includes(searchQuery)
      })
      .map((note) => (
        <tr key={note.id}>
          <td>{note.title}</td>
          <td>
            <Link to={`/edit/${note.id}`} className="icon">
              <FontAwesomeIcon icon={faEdit} />
            </Link>
            <FontAwesomeIcon
              icon={faTimes}
              onClick={() => onDeleteClicked(note.id)}
              className="icon"
            />
          </td>
        </tr>
      ))

    content = (
      <table>
        <thead>
          <tr>
            <th>Name</th>
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
