import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import notesReducer from '../features/notes/notesSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    notes: notesReducer,
  },
})
