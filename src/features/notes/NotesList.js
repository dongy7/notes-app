import React from 'react'
import { useSelector } from 'react-redux'

export const NotesList = () => {
  const notes = useSelector((state) => state.notes)

  const renderedNotes = notes.map((note) => (
    <tr key={note.id}>
      <td>{note.title}</td>
    </tr>
  ))

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>{renderedNotes}</tbody>
    </table>
  )
}
