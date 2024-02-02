import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'
import { TodoDetails } from './TodoDetails.tsx'
import * as Router from 'react-router'

const todo = { id: '1', title: 'test-title', description: 'test-description' }

test('should render page with title, input, textarea, and a footer with a delete and a update button', () => {
  // given / when
  render(<TodoDetails />)

  // then
  expect(screen.getByTestId('page')).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: 'TODO Details' })).toBeInTheDocument()

  const contentWrappers = screen.getAllByTestId('content')
  expect(contentWrappers).toHaveLength(2)

  const inputHeaders = contentWrappers[0].querySelectorAll('h6')
  expect(inputHeaders).toHaveLength(2)
  expect(inputHeaders[0].textContent).toEqual('Title:')
  expect(inputHeaders[1].textContent).toEqual('Description:')

  const pageContent = contentWrappers[0]
  expect(pageContent.querySelector('input')).toBeInTheDocument()
  expect(pageContent.querySelector('textarea')).toBeInTheDocument()

  const footerContent = contentWrappers[1]
  expect(footerContent.parentElement?.dataset.testid).toEqual('footer')

  const buttons = footerContent.querySelectorAll('button')
  expect(buttons).toHaveLength(2)
  expect(buttons[0].textContent).toEqual('Delete')
  expect(buttons[1].textContent).toEqual('Edit')
})

test('should display the title and description of the todo', async () => {
  // given / when
  localStorage.setItem('todos', JSON.stringify([todo]))
  vi.spyOn(Router, 'useParams').mockReturnValue({ id: todo.id })

  render(<TodoDetails />)

  // then
  await waitFor(() => {
    const inputs = screen.getAllByRole<HTMLInputElement | HTMLTextAreaElement>('textbox')
    expect(inputs[0].value).toEqual('test-title')
    expect(inputs[1].value).toEqual('test-description')
  })
})

test('should update todo title and description and navigate to todo list page', async () => {
  const user = userEvent.setup()

  // given
  localStorage.setItem('todos', JSON.stringify([todo]))
  vi.spyOn(Router, 'useParams').mockReturnValue({ id: todo.id })

  const navigateSpy = vi.fn()
  vi.spyOn(Router, 'useNavigate').mockReturnValue(navigateSpy)

  render(<TodoDetails />)

  const inputs = screen.getAllByRole<HTMLInputElement | HTMLTextAreaElement>('textbox')

  // when
  await user.type(inputs[0], 'updated-title', { initialSelectionStart: 0, initialSelectionEnd: todo.title.length })
  await user.type(
    inputs[1],
    'updated-description',
    { initialSelectionStart: 0, initialSelectionEnd: todo.description.length },
  )
  await user.click(screen.getByRole('button', { name: 'Edit' }))

  // then
  const todos = JSON.parse(localStorage.getItem('todos')!)[0]
  expect(todos.title).toEqual('updated-title')
  expect(todos.description).toEqual('updated-description')

  expect(navigateSpy).toHaveBeenCalledWith('/')
})

test('should open dialog and ask for permission to delete a todo', async () => {
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

  // when
  await user.click(screen.getByRole('button', { name: 'Delete' }))

  // then
  expect(screen.getByTestId('dialog')).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: 'Delete TODO?' })).toBeInTheDocument()
  expect(
    screen.getByText(`The TODO "${todo.title}" will be removed permanently. Do you want to proceed?`),
  ).toBeInTheDocument()
  expect(screen.getByText('Cancel')).toBeInTheDocument()
  expect(screen.getByText('Ok')).toBeInTheDocument()
})

test('should delete todo and navigate to todo list page', async () => {
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

  // when
  await user.click(screen.getByRole('button', { name: 'Delete' }))
  await user.click(screen.getByText('Ok'))

  // then
  const todos = JSON.parse(localStorage.getItem('todos')!)
  expect(todos).toHaveLength(0)

  expect(navigateSpy).toHaveBeenCalledWith('/')
})
