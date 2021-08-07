import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { useHistory } from 'react-router'
import { editNote } from './notesSlice'

export const EditNote = ({ match }) => {
  const { noteId } = match.params

  const note = useSelector((state) => {
    return state.notes.notes.find((note) => note.id === noteId)
  })

  const [title, setTitle] = useState(note.title)
  const [content, setContent] = useState(note.content)

  const onTitleChanged = (e) => setTitle(e.target.value)
  const onContentChanged = (e) => setContent(e.target.value)

  const dispatch = useDispatch()
  const history = useHistory()

  const onSaveClicked = async () => {
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

  return (
    <div>
      <h2>Edit Note</h2>
      <form>
        <label htmlFor="noteTitle">Note Title:</label>
        <input
          type="text"
          id="noteTitle"
          name="noteTitle"
          placeholder="What's on your mind?"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="noteContent"
          name="noteContent"
          value={content}
          onChange={onContentChanged}
          rows={30}
        />
      </form>
      <button type="button" onClick={onSaveClicked}>
        Save
      </button>
    </div>
  )
}
