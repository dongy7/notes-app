import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { NotesList } from './features/notes/NotesList'
import { EditNote } from './features/notes/EditNote'
import { AddNote } from './features/notes/AddNote'
import { Navbar } from './app/Navbar'
import { makeServer } from './api/server'

makeServer()

function App() {
  return (
    <Router>
      <div className="App">
        <div className="container">
          <Navbar />
          <Switch>
            <Route exact path="/" render={() => <NotesList />} />
            <Route exact path="/edit/:noteId" component={EditNote} />
            <Route exact path="/create" component={AddNote} />
            <Redirect to="/" />
          </Switch>
        </div>
      </div>
    </Router>
  )
}

export default App
