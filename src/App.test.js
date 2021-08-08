import React from 'react'
import { setupServer } from 'msw/node'
import { rest } from 'msw'
import userEvent from '@testing-library/user-event'
import { render, fireEvent, screen } from './test/test-utils'
import App from './App'

export const handlers = [
  rest.get('/api/notes', (req, res, ctx) => {
    return res(
      ctx.json(
        {
          notes: [
            {
              id: '1',
              title: 'Note 1',
              content: 'Note content 1',
              date: '2021-08-06T04:26:25.519Z',
            },
          ],
        },
        ctx.delay(0)
      )
    )
  }),
  rest.delete('/api/notes/:noteId', (req, res, ctx) => {
    const { noteId } = req.params
    return res(
      ctx.json({
        id: noteId,
      })
    )
  }),
  rest.post('/api/notes', (req, res, ctx) => {
    const note = req.body
    note.id = '2'
    note.date = new Date().toISOString()

    return res(
      ctx.json({
        note,
      })
    )
  }),
  rest.patch('/api/notes/:noteId', (req, res, ctx) => {
    const note = req.body

    return res(
      ctx.json({
        note: {
          ...note,
          date: new Date().toISOString(),
        },
      })
    )
  }),
]

const server = setupServer(...handlers)

// Enable API mocking before tests.
beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())

describe('Notes', function () {
  beforeEach(() => {})

  afterEach(() => {})

  it('renders the app with the initial notes', async () => {
    const { container } = render(<App />)

    expect(container.querySelector('loader')).not.toBeUndefined()
    expect(await screen.findByText('Note 1')).toBeInTheDocument()
  })

  it('adds a new note', async () => {
    render(<App />)
    fireEvent.click(screen.getByText('New Note'))
    expect(screen.getByText('Create New Note')).not.toBeNull()

    userEvent.type(screen.getByLabelText('Note Title:'), 'Note 2')
    userEvent.type(screen.getByLabelText('Content:'), 'Note content 2')

    fireEvent.click(screen.getByText('Create'))

    expect(await screen.findByText('Note 2')).toBeInTheDocument()
    expect(screen.getByText('Note 1')).toBeInTheDocument()
  })

  it('edits an existing note', async () => {
    render(<App />)

    expect(await screen.findByText('Note 1')).toBeInTheDocument()
    fireEvent.click(screen.getByTestId('editLink'))

    const titleInputField = screen.getByLabelText('Note Title:')
    userEvent.clear(titleInputField)
    userEvent.type(titleInputField, 'Edited Note')

    fireEvent.click(screen.getByText('Save'))

    expect(await screen.findByText('Edited Note')).toBeInTheDocument()
    expect(screen.queryByText('Note 1')).toBeNull()
  })

  it('deletes the note', async () => {
    render(<App />)
    expect(await screen.findByText('Note 1')).toBeInTheDocument()
    expect(screen.queryByText('Note 1')).not.toBeNull()

    fireEvent.click(screen.getByTestId('deleteIcon'))

    expect(screen.queryByText('Note 1')).toBeNull()
  })

  it('filters notes', async () => {
    render(<App />)

    expect(await screen.findByText('Note 1')).toBeInTheDocument()

    const inputField = screen.getByPlaceholderText('Search for notes')

    userEvent.type(inputField, 'Test')
    expect(screen.queryByText('Note 1')).toBeNull()

    userEvent.clear(inputField)
    expect(screen.getByText('Note 1'))

    userEvent.type(inputField, 'Note')
    expect(screen.getByText('Note 1'))
  })
})
