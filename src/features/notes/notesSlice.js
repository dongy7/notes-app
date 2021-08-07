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

export const deleteNote = createAsyncThunk('notes/deleteNote', async (id) => {
  const response = await axios.delete(`/api/notes/${id}`)
  return response.data
})

export const editNote = createAsyncThunk(
  'notes/editNote',
  async ({ id, title, content }) => {
    const response = await axios.patch(`/api/notes/${id}`, {
      id,
      title,
      content,
    })

    return response.data
  }
)

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
    [deleteNote.fulfilled]: (state, action) => {
      const id = action.payload.id
      state.notes = state.notes.filter((note) => note.id !== id)
    },
    [editNote.fulfilled]: (state, action) => {
      const updatedNote = action.payload.note
      const existingNote = state.notes.find(
        (note) => note.id === updatedNote.id
      )

      existingNote.title = updatedNote.title
      existingNote.content = updatedNote.content
    },
  },
})

export default notesSlice.reducer
