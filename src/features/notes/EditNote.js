import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { useHistory } from 'react-router'
import { editNote, selectNoteById, selectEditNoteStatus } from './notesSlice'

export const EditNote = ({ match }) => {
  const { noteId } = match.params

  const note = useSelector((state) => selectNoteById(state, noteId))

  const [title, setTitle] = useState(note.title)
  const [content, setContent] = useState(note.content)

  const onTitleChanged = (e) => setTitle(e.target.value)
  const onContentChanged = (e) => setContent(e.target.value)

  const dispatch = useDispatch()
  const history = useHistory()

  const editStatus = useSelector((state) => selectEditNoteStatus(state))
  const canSave = editStatus === 'idle' && !!title

  const onSaveClicked = async () => {
    if (canSave) {
      try {
        const resultAction = await dispatch(
          editNote({ id: noteId, title, content })
        )
        unwrapResult(resultAction)
        history.push('/')
      } catch (err) {
        console.log(err)
      }
    }
  }

  if (editStatus === 'loading') {
    return <div className="loader">Loading...</div>
  }

  return (
    <div className="editor">
      <div className="editor-header">
        <h2>Edit Note</h2>
      </div>
      <div className="editor-form">
        <form
          onSubmit={(e) => {
            e.preventDefault()
          }}
        >
          <div className="form-title">
            <label htmlFor="noteTitle">Note Title:</label>
            <input
              type="text"
              id="noteTitle"
              name="noteTitle"
              placeholder="Note title"
              value={title}
              onChange={onTitleChanged}
            />
          </div>
          <div className="form-content">
            <label htmlFor="noteContent">Content:</label>
            <textarea
              id="noteContent"
              name="noteContent"
              value={content}
              onChange={onContentChanged}
            />
          </div>
        </form>
      </div>
      <div className="editor-footer">
        <button type="button" onClick={onSaveClicked} disabled={!canSave}>
          Save
        </button>
      </div>
    </div>
  )
}
