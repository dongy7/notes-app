import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { unwrapResult } from '@reduxjs/toolkit'
import { createNote } from './notesSlice'

export const AddNote = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const onTitleChanged = (e) => setTitle(e.target.value)
  const onContentChanged = (e) => setContent(e.target.value)

  const dispatch = useDispatch()
  const history = useHistory()

  const onCreateClicked = async () => {
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
        <button type="button" onClick={onCreateClicked}>
          Create
        </button>
      </div>
    </div>
  )
}
