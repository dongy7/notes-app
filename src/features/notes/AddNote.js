import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { unwrapResult } from '@reduxjs/toolkit'
import { createNote, selectAddNoteStatus } from './notesSlice'

export const AddNote = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const onTitleChanged = (e) => setTitle(e.target.value)
  const onContentChanged = (e) => setContent(e.target.value)

  const dispatch = useDispatch()
  const history = useHistory()
  const addStatus = useSelector((state) => selectAddNoteStatus(state))

  const canAdd = addStatus === 'idle' && !!title

  const onCreateClicked = async () => {
    if (canAdd) {
      try {
        const resultAction = await dispatch(
          createNote({
            title,
            content,
          })
        )

        unwrapResult(resultAction)
        history.push('/')
      } catch (err) {
        console.log(err)
      }
    }
  }

  if (addStatus === 'loading') {
    return <div className="loader">Loading...</div>
  }

  return (
    <div className="editor">
      <div className="editor-header">
        <h2>Create New Note</h2>
      </div>
      <div className="editor-form">
        <form>
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
            <label htmlFor="postContent">Content:</label>
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
        <button type="button" onClick={onCreateClicked} disabled={!canAdd}>
          Create
        </button>
      </div>
    </div>
  )
}
