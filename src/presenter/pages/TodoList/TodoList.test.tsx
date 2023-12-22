import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as Router from 'react-router'
import { beforeEach, expect, test, vi } from 'vitest'
import { TodoList } from './TodoList.tsx'

beforeEach(() => {
  localStorage.setItem('todos', JSON.stringify([
    { id: '1', title: 'Todo 1', description: 'Description 1' },
    { id: '2', title: 'Todo 2', description: 'Description 2' },
  ]))
})

test('should render page with title, a list of todos, and footer with a create button', async () => {
  // given / when
  render(<TodoList />)

  // then
  expect(screen.getByTestId('page')).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: 'TODOs' })).toBeInTheDocument()

  await waitFor(() => {
    expect(screen.getAllByTestId('list-item')).toHaveLength(2)
    expect(screen.getByText('Todo 1')).toBeInTheDocument()
    expect(screen.getByText('Todo 2')).toBeInTheDocument()
  })

  expect(screen.getByTestId('footer')).toBeInTheDocument()
  expect(screen.getByRole('button', { name: '+' })).toBeInTheDocument()
})

test('should open dialog and ask for permission to delete a todo', async () => {
  const user = userEvent.setup()

  // given
  render(
    <div>
      <div id="portal-root" />
      <TodoList />
    </div>,
  )

  const listItems = await waitFor(() => screen.getAllByTestId('list-item'))

  // when
  await user.click(listItems[0].querySelector('svg')!)

  // then
  expect(screen.getByTestId('dialog')).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: 'Delete TODO?' })).toBeInTheDocument()
  expect(screen.getByText('The TODO "Todo 1" will be removed permanently. Do you want to proceed?')).toBeInTheDocument()
  expect(screen.getByText('Cancel')).toBeInTheDocument()
  expect(screen.getByText('Ok')).toBeInTheDocument()
})

test('should delete todo and close dialog', async () => {
  const user = userEvent.setup()

  // given
  render(
    <div>
      <div id="portal-root" />
      <TodoList />
    </div>,
  )

  const listItems = await waitFor(() => screen.getAllByTestId('list-item'))

  // when
  await user.click(listItems[0].querySelector('svg')!)
  await user.click(screen.getByText('Ok'))

  // then
  const todos = JSON.parse(localStorage.getItem('todos')!)
  expect(todos).toHaveLength(1)
  expect(todos[0].title).toEqual('Todo 2')
  expect(todos[0].description).toEqual('Description 2')

  expect(screen.queryByTestId('dialog')).not.toBeInTheDocument()
})

test('should navigate to the todo details page', async () => {
  const user = userEvent.setup()

  // given
  const navigateSpy = vi.fn()
  vi.spyOn(Router, 'useNavigate').mockReturnValue(navigateSpy)

  render(<TodoList />)

  const listItems = await waitFor(() => screen.getAllByTestId('list-item'))

  // when
  await user.click(listItems[0])

  // then
  expect(navigateSpy).toHaveBeenCalledWith('/todo/detail/1')
})
