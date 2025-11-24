import { act, renderHook } from '@testing-library/react'
import { expect, describe, it, vi, beforeEach } from 'vitest'
import { Todo } from '../../../domain/model/Todo.ts'
import { UseCaseWithParams } from '../../../domain/model/types'
import { createTodoViewModel } from './createTodoViewModel.ts'

// Mock react-router-dom
const mockNavigate = vi.fn()
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}))

describe('CreateTodoViewModel', () => {
  let mockCreateTodoUseCase: UseCaseWithParams<Todo, Omit<Todo, 'id'>>

  beforeEach(() => {
    mockNavigate.mockClear()

    mockCreateTodoUseCase = {
      execute: vi.fn(),
    }
  })

  describe('when creating a todo', () => {
    it.each([
      ['', '', 'empty title and description'],
      ['Buy groceries', '', 'title only'],
      ['', 'Get milk and bread', 'description only'],
      ['Buy groceries', 'Get milk and bread', 'both title and description'],
    ])('should execute create todo use case with "%s" and "%s" (%s)', async (title, description) => {
      // given
      const expectedTodo = { title, description }
      const createdTodo = { ...expectedTodo, id: '123' }
      const createTodoSpy = vi.spyOn(mockCreateTodoUseCase, 'execute').mockResolvedValue(createdTodo)

      const { result } = renderHook(() => createTodoViewModel({ createTodoUseCase: mockCreateTodoUseCase }))

      // when
      act(() => result.current.setTitle(title))
      act(() => result.current.setDescription(description))
      await act(() => result.current.createTodo())

      // then
      expect(createTodoSpy).toHaveBeenCalledWith(expectedTodo)
    })

    it('should clear form fields after successful todo creation', async () => {
      // given
      const createdTodo = { id: '123', title: 'Test', description: 'Description' }
      vi.spyOn(mockCreateTodoUseCase, 'execute').mockResolvedValue(createdTodo)

      const { result } = renderHook(() => createTodoViewModel({ createTodoUseCase: mockCreateTodoUseCase }))

      // when
      act(() => result.current.setTitle('Test Todo'))
      act(() => result.current.setDescription('Test Description'))
      await act(() => result.current.createTodo())

      // then - form should be reset
      expect(result.current.title).toBe('')
      expect(result.current.description).toBe('')
    })

    it('should navigate to home page after successful todo creation', async () => {
      // given
      const createdTodo = { id: '123', title: 'Test', description: 'Description' }
      vi.spyOn(mockCreateTodoUseCase, 'execute').mockResolvedValue(createdTodo)

      const { result } = renderHook(() => createTodoViewModel({ createTodoUseCase: mockCreateTodoUseCase }))

      // when
      await act(() => result.current.createTodo())

      // then
      expect(mockNavigate).toHaveBeenCalledWith('/')
    })
  })

  describe('when updating form fields', () => {
    it('should update title when setTitle is called', () => {
      // given
      const { result } = renderHook(() => createTodoViewModel({ createTodoUseCase: mockCreateTodoUseCase }))
      const newTitle = 'New Todo Title'

      // when
      act(() => result.current.setTitle(newTitle))

      // then
      expect(result.current.title).toBe(newTitle)
    })

    it('should update description when setDescription is called', () => {
      // given
      const { result } = renderHook(() => createTodoViewModel({ createTodoUseCase: mockCreateTodoUseCase }))
      const newDescription = 'New Todo Description'

      // when
      act(() => result.current.setDescription(newDescription))

      // then
      expect(result.current.description).toBe(newDescription)
    })
  })
})
