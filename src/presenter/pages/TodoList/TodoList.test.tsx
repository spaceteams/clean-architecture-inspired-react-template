import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as Router from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { TodoList } from './TodoList.tsx'

describe('TodoList', () => {
  beforeEach(() => {
    localStorage.setItem('todos', JSON.stringify([
      { id: '1', title: 'Todo 1', description: 'Description 1' },
      { id: '2', title: 'Todo 2', description: 'Description 2' },
    ]))
  })

  describe('Todo Display', () => {
    it('should display all existing todos to the user', async () => {
      // given / when
      render(<TodoList />)

      // then
      expect(screen.getByRole('heading', { name: 'TODOs' })).toBeInTheDocument()

      await waitFor(() => {
        expect(screen.getAllByTestId('list-item')).toHaveLength(2)
        expect(screen.getByText('Todo 1')).toBeInTheDocument()
        expect(screen.getByText('Todo 2')).toBeInTheDocument()
      })
    })

    it('should provide access to todo creation functionality', async () => {
      // given / when
      render(<TodoList />)

      // then
      await waitFor(() => {
        expect(screen.getAllByTestId('list-item')).toHaveLength(2)
        expect(screen.getByRole('button', { name: '+' })).toBeInTheDocument()
      })
    })
  })

  describe('Todo Deletion', () => {
    it('should request user confirmation before deleting a todo', async () => {
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
      expect(screen.getByRole('heading', { name: 'Delete TODO?' })).toBeInTheDocument()
      expect(screen.getByText(
        'The TODO "Todo 1" will be removed permanently. Do you want to proceed?',
      )).toBeInTheDocument()
      expect(screen.getByText('Cancel')).toBeInTheDocument()
      expect(screen.getByText('Ok')).toBeInTheDocument()
    })

    it('should permanently remove todo when user confirms deletion', async () => {
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
      const remainingTodos = JSON.parse(localStorage.getItem('todos')!)
      expect(remainingTodos).toHaveLength(1)
      expect(remainingTodos[0].title).toEqual('Todo 2')
      expect(remainingTodos[0].description).toEqual('Description 2')

      expect(screen.queryByTestId('dialog')).not.toBeInTheDocument()
    })
  })

  describe('Navigation', () => {
    it('should navigate to todo details when user selects a todo', async () => {
      const user = userEvent.setup()
      const navigateSpy = vi.fn()

      // given
      vi.spyOn(Router, 'useNavigate').mockReturnValue(navigateSpy)
      render(<TodoList />)

      const listItems = await waitFor(() => screen.getAllByTestId('list-item'))

      // when
      await user.click(listItems[0])

      // then
      expect(navigateSpy).toHaveBeenCalledWith('/todo/detail/1')
    })

    it('should navigate to todo creation when user clicks create button', async () => {
      const user = userEvent.setup()
      const navigateSpy = vi.fn()

      // given
      vi.spyOn(Router, 'useNavigate').mockReturnValue(navigateSpy)
      render(<TodoList />)

      // when
      await user.click(screen.getByRole('button', { name: '+' }))

      // then
      expect(navigateSpy).toHaveBeenCalledWith('/todo/create')
    })
  })
})
