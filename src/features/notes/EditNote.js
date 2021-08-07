import React, { useState } from 'react'
import { useSelector } from 'react-redux'

export const EditNote = ({ match }) => {
  const { noteId } = match.params

  const note = useSelector((state) => {
    return state.notes.notes.find((note) => note.id === noteId)
  })

  const [title, setTitle] = useState(note.title)
  const [content, setContent] = useState(note.content)

  const onTitleChanged = (e) => setTitle(e.target.value)
  const onContentChanged = (e) => setContent(e.target.value)

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
      <button type="button">Save</button>
    </div>
  )
}
