import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export const Navbar = () => {
  return (
    <nav>
      <section>
        <h1>
          <Link to="/" className="logo">
            Notes
          </Link>
        </h1>

        <div className="navContent">
          <div className="navLinks">
            <Link to="/create" className="button">
              <FontAwesomeIcon icon={faPlus} /> New Note
            </Link>
          </div>
        </div>
      </section>
    </nav>
  )
}
