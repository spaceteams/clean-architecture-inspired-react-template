import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import { TodoDetails } from './TodoDetails.tsx'
import * as Router from 'react-router-dom'

const todo = { id: '1', title: 'test-title', description: 'test-description' }

describe('TodoDetails - Initial Rendering', () => {
  it('should display todo editing form with required controls', () => {
    // given / when
    render(<TodoDetails />)

    // then
    expect(screen.getByRole('heading', { name: 'TODO Details' })).toBeInTheDocument()

    const textboxes = screen.getAllByRole('textbox')
    expect(textboxes).toHaveLength(2) // input field and textarea field

    expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Edit' })).toBeInTheDocument()
  })
})

describe('TodoDetails - Data Loading', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should display todo data when loaded from storage', async () => {
    // given
    localStorage.setItem('todos', JSON.stringify([todo]))
    vi.spyOn(Router, 'useParams').mockReturnValue({ id: todo.id })

    // when
    render(<TodoDetails />)

    // then
    await waitFor(() => {
      const textboxes = screen.getAllByRole<HTMLInputElement | HTMLTextAreaElement>('textbox')
      expect(textboxes).toHaveLength(2)
      expect(textboxes[0].value).toEqual('test-title')
      expect(textboxes[1].value).toEqual('test-description')
    })
  })
})

describe('TodoDetails - Update Workflow', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should save todo changes and navigate to list when edit is clicked', async () => {
    const user = userEvent.setup()

    // given
    localStorage.setItem('todos', JSON.stringify([todo]))
    vi.spyOn(Router, 'useParams').mockReturnValue({ id: todo.id })

    const navigateSpy = vi.fn()
    vi.spyOn(Router, 'useNavigate').mockReturnValue(navigateSpy)

    render(<TodoDetails />)

    await waitFor(() => screen.getAllByRole('textbox'))

    // when
    const textboxes = screen.getAllByRole<HTMLInputElement | HTMLTextAreaElement>('textbox')
    const titleInput = textboxes[0]
    const descriptionTextarea = textboxes[1]

    await user.clear(titleInput)
    await user.type(titleInput, 'updated-title')
    await user.clear(descriptionTextarea)
    await user.type(descriptionTextarea, 'updated-description')
    await user.click(screen.getByRole('button', { name: 'Edit' }))

    // then
    const updatedTodo = JSON.parse(localStorage.getItem('todos')!)[0]
    expect(updatedTodo.title).toEqual('updated-title')
    expect(updatedTodo.description).toEqual('updated-description')
    expect(navigateSpy).toHaveBeenCalledWith('/')
  })
})

describe('TodoDetails - Delete Workflow', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should show confirmation dialog when delete button is clicked', async () => {
    const user = userEvent.setup()

    // given
    localStorage.setItem('todos', JSON.stringify([todo]))
    vi.spyOn(Router, 'useParams').mockReturnValue({ id: todo.id })

    render(
      <div>
        <div id="portal-root" />
        <TodoDetails />
      </div>,
    )

    await waitFor(() => screen.getByRole('button', { name: 'Delete' }))

    // when
    await user.click(screen.getByRole('button', { name: 'Delete' }))

    // then
    expect(screen.getByRole('heading', { name: 'Delete TODO?' })).toBeInTheDocument()
    expect(
      screen.getByText(`The TODO "${todo.title}" will be removed permanently. Do you want to proceed?`),
    ).toBeInTheDocument()
    expect(screen.getByText('Cancel')).toBeInTheDocument()
    expect(screen.getByText('Ok')).toBeInTheDocument()
  })

  it('should remove todo and navigate to list when deletion is confirmed', async () => {
    const user = userEvent.setup()

    // given
    localStorage.setItem('todos', JSON.stringify([todo]))
    vi.spyOn(Router, 'useParams').mockReturnValue({ id: todo.id })

    const navigateSpy = vi.fn()
    vi.spyOn(Router, 'useNavigate').mockReturnValue(navigateSpy)

    render(
      <div>
        <div id="portal-root" />
        <TodoDetails />
      </div>,
    )

    await waitFor(() => screen.getByRole('button', { name: 'Delete' }))

    // when
    await user.click(screen.getByRole('button', { name: 'Delete' }))
    await user.click(screen.getByText('Ok'))

    // then
    const todos = JSON.parse(localStorage.getItem('todos')!)
    expect(todos).toHaveLength(0)
    expect(navigateSpy).toHaveBeenCalledWith('/')
  })
})
