import React from 'react'
import { Link } from 'react-router-dom'

export const Navbar = () => {
  return (
    <nav>
      <section>
        <h1>Notes App</h1>

        <div className="navContent">
          <div className="navLinks">
            <Link to="/">Notes</Link>
            <Link to="/create">New Note</Link>
          </div>
        </div>
      </section>
    </nav>
  )
}
