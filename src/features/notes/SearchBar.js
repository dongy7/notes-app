import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { searchQueryUpdated } from './notesSlice'

export const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const dispatch = useDispatch()
  const onSearchQueryChanged = (e) => {
    const query = e.target.value.toLowerCase()
    setSearchQuery(query)
    dispatch(searchQueryUpdated(query))
  }

  return (
    <div>
      <input
        type="text"
        id="searchQuery"
        name="searchQuery"
        placeholder="Search for notes"
        value={searchQuery}
        onChange={onSearchQueryChanged}
      />
    </div>
  )
}
