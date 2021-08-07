import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { NotesList } from './features/notes/NotesList'
import { EditNote } from './features/notes/EditNote'
import { makeServer } from './api/server'

makeServer()

function App() {
  return (
    <Router>
      <div className="App">
        <div className="container">
          <Switch>
            <Route exact path="/" render={() => <NotesList />} />
            <Route exact path="/edit/:noteId" component={EditNote} />
            <Redirect to="/" />
          </Switch>
        </div>
      </div>
    </Router>
  )
}

export default App
