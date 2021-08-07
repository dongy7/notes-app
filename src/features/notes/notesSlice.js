import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  notes: [],
  status: 'idle',
  error: '',
}

export const fetchNotes = createAsyncThunk('notes/fetchNotes', async () => {
  const response = await axios.get('/api/notes')
  return response.data.notes
})

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchNotes.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchNotes.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      state.notes = state.notes.concat(action.payload)
    },
    [fetchNotes.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
  },
})

export default notesSlice.reducer
