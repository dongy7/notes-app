import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  { id: '1', title: 'My note 1' },
  { id: '2', title: 'My note 2' },
]

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {},
})

export default notesSlice.reducer
