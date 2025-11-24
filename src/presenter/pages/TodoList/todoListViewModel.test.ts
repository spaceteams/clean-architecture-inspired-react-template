import { act, renderHook, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Todo } from '../../../domain/model/Todo.ts'
import { Id, UseCase, UseCaseWithParams } from '../../../domain/model/types'
import { todoListViewModel } from './todoListViewModel.ts'

const mockTodos = [
  { id: '1', title: 'Todo 1', description: 'description 1' },
  { id: '2', title: 'Todo 2', description: 'description 2' },
]

const getTodosUseCase = { execute: vi.fn() } as unknown as UseCase<Todo[]>
const deleteTodoUseCase = { execute: vi.fn() } as unknown as UseCaseWithParams<void, Id>

describe('TodoListViewModel', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(getTodosUseCase.execute).mockResolvedValue(mockTodos)
    vi.mocked(deleteTodoUseCase.execute).mockResolvedValue(undefined)
  })

  describe('Todo Loading', () => {
    it('should load todos on initialization', async () => {
      // when
      const { result } = renderHook(() => todoListViewModel({ getTodosUseCase, deleteTodoUseCase }))

      // then
      await waitFor(() => {
        expect(result.current.todos).toEqual(mockTodos)
      })
    })

    it.each([
      [
        [{ id: 'B', title: '', description: '' }, { id: 'A', title: '', description: '' }],
        ['A', 'B'],
      ],
      [
        [
          { id: 'Z', title: '', description: '' },
          { id: 'A', title: '', description: '' },
          { id: 'M', title: '', description: '' },
        ],
        ['A', 'M', 'Z'],
      ],
      [
        [
          { id: '3', title: '', description: '' },
          { id: '1', title: '', description: '' },
          { id: '2', title: '', description: '' },
        ],
        ['1', '2', '3'],
      ],
    ])('should sort todos by id ascending when loaded in any order', async (unsortedTodos, expectedOrder) => {
      // given
      vi.mocked(getTodosUseCase.execute).mockResolvedValue(unsortedTodos)

      // when
      const { result } = renderHook(() => todoListViewModel({ getTodosUseCase, deleteTodoUseCase }))

      // then
      await waitFor(() => {
        expect(result.current.todos.map(({ id }) => id)).toEqual(expectedOrder)
      })
    })
  })

  describe('Delete Dialog Management', () => {
    it('should show delete dialog when todo is selected for deletion', async () => {
      // given
      const { result } = renderHook(() => todoListViewModel({ getTodosUseCase, deleteTodoUseCase }))

      await waitFor(() => {
        expect(result.current.todos).toEqual(mockTodos)
      })

      const todoToDelete = mockTodos[0]

      // when
      act(() => result.current.showDeleteDialog(todoToDelete))

      // then
      expect(result.current.todoToDelete).toEqual(todoToDelete)
    })

    it('should hide delete dialog when close action is triggered', async () => {
      // given
      const { result } = renderHook(() => todoListViewModel({ getTodosUseCase, deleteTodoUseCase }))

      await waitFor(() => {
        expect(result.current.todos).toEqual(mockTodos)
      })

      act(() => result.current.showDeleteDialog(mockTodos[0]))
      expect(result.current.todoToDelete).toEqual(mockTodos[0])

      // when
      act(() => result.current.closeDeleteDialog())

      // then
      expect(result.current.todoToDelete).toBeUndefined()
    })
  })

  describe('Todo Deletion', () => {
    it('should delete selected todo and update the list', async () => {
      // given
      const deleteTodoUseCaseSpy = vi.mocked(deleteTodoUseCase.execute)
      const { result } = renderHook(() => todoListViewModel({ getTodosUseCase, deleteTodoUseCase }))

      await waitFor(() => {
        expect(result.current.todos).toEqual(mockTodos)
      })

      const todoToDelete = mockTodos[0]

      // when
      act(() => result.current.showDeleteDialog(todoToDelete))
      await act(() => result.current.deleteTodo())

      // then
      expect(deleteTodoUseCaseSpy).toHaveBeenCalledWith(todoToDelete.id)
      expect(result.current.todos).toHaveLength(1)
      expect(result.current.todos[0].id).toEqual(mockTodos[1].id)
    })

    it('should close delete dialog after successful deletion', async () => {
      // given
      const { result } = renderHook(() => todoListViewModel({ getTodosUseCase, deleteTodoUseCase }))

      await waitFor(() => {
        expect(result.current.todos).toEqual(mockTodos)
      })

      // when
      act(() => result.current.showDeleteDialog(mockTodos[0]))
      await act(() => result.current.deleteTodo())

      // then
      expect(result.current.todoToDelete).toBeUndefined()
    })

    it('should not delete anything when no todo is selected', async () => {
      // given
      const deleteTodoUseCaseSpy = vi.mocked(deleteTodoUseCase.execute)
      const { result } = renderHook(() => todoListViewModel({ getTodosUseCase, deleteTodoUseCase }))

      await waitFor(() => {
        expect(result.current.todos).toEqual(mockTodos)
      })

      // when
      await act(() => result.current.deleteTodo())

      // then
      expect(deleteTodoUseCaseSpy).not.toHaveBeenCalled()
      expect(result.current.todos).toHaveLength(2)
    })
  })
})
