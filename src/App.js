import React from 'react'
import { NotesList } from './features/notes/NotesList'
import { makeServer } from './api/server'

makeServer()

function App() {
  return (
    <div className="App">
      <div className="container">
        <NotesList />
      </div>
    </div>
  )
}

export default App
