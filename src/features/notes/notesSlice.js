import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  notes: [],
  loadStatus: 'idle',
  loadError: '',
  searchQuery: '',
  addStatus: 'idle',
  addError: '',
  editStatus: 'idle',
  editError: '',
}

export const fetchNotes = createAsyncThunk('notes/fetchNotes', async () => {
  const response = await axios.get('/api/notes')
  return response.data.notes
})

export const createNote = createAsyncThunk(
  'notes/createNote',
  async ({ title, content }) => {
    const response = await axios.post('/api/notes', {
      title,
      content,
    })

    return response.data
  }
)

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
  reducers: {
    searchQueryUpdated(state, action) {
      state.searchQuery = action.payload
    },
  },
  extraReducers: {
    [fetchNotes.pending]: (state, action) => {
      state.loadStatus = 'loading'
    },
    [fetchNotes.fulfilled]: (state, action) => {
      state.loadStatus = 'succeeded'
      state.notes = state.notes.concat(action.payload)
    },
    [fetchNotes.rejected]: (state, action) => {
      state.loadStatus = 'failed'
      state.loadError = action.error.message
    },
    [deleteNote.fulfilled]: (state, action) => {
      const id = action.payload.id
      state.notes = state.notes.filter((note) => note.id !== id)
    },
    [editNote.pending]: (state, action) => {
      state.editStatus = 'loading'
    },
    [editNote.fulfilled]: (state, action) => {
      state.editStatus = 'idle'
      const updatedNote = action.payload.note
      const existingNote = state.notes.find(
        (note) => note.id === updatedNote.id
      )

      existingNote.title = updatedNote.title
      existingNote.content = updatedNote.content
    },
    [editNote.rejected]: (state, action) => {
      state.editStatus = 'idle'
      state.editError = action.error.message
    },
    [createNote.pending]: (state, action) => {
      state.addStatus = 'loading'
    },
    [createNote.fulfilled]: (state, action) => {
      state.addStatus = 'idle'
      const note = action.payload.note
      state.notes = state.notes.concat(note)
    },
    [createNote.rejected]: (state, action) => {
      state.addStatus = 'idle'
      state.addError = action.error.message
    },
  },
})

export const { searchQueryUpdated } = notesSlice.actions

export default notesSlice.reducer
