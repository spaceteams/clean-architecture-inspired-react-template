import { act, renderHook, waitFor } from '@testing-library/react'
import * as Router from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Todo } from '../../../domain/model/Todo.ts'
import { Id, UseCaseWithParams } from '../../../domain/model/types'
import { todoDetailsViewModel } from './todoDetailsViewModel.ts'

const getTodoUseCase = { execute: () => Promise.resolve() } as unknown as UseCaseWithParams<Todo, Id>
const updateTodoUseCase = { execute: () => Promise.resolve() } as unknown as UseCaseWithParams<Todo, Todo>
const deleteTodoUseCase = { execute: () => Promise.resolve() } as unknown as UseCaseWithParams<void, Id>

const dependencies = { getTodoUseCase, updateTodoUseCase, deleteTodoUseCase }

describe('TodoDetailsViewModel', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.restoreAllMocks()
  })

  describe('Todo Loading', () => {
    it('should load and display todo details when valid id is provided', async () => {
      // given
      const todo = { id: '1', title: 'Buy groceries', description: 'Milk and bread' }
      vi.spyOn(Router, 'useParams').mockReturnValue({ id: todo.id })
      vi.spyOn(getTodoUseCase, 'execute').mockReturnValue(Promise.resolve(todo))

      // when
      const { result } = renderHook(() => todoDetailsViewModel(dependencies))

      // then
      await waitFor(() => {
        expect(result.current.title).toBe(todo.title)
        expect(result.current.description).toBe(todo.description)
      })
    })

    it('should start with empty fields when no todo id is provided', () => {
      // given
      vi.spyOn(Router, 'useParams').mockReturnValue({ id: undefined })

      // when
      const { result } = renderHook(() => todoDetailsViewModel(dependencies))

      // then
      expect(result.current.title).toBe('')
      expect(result.current.description).toBe('')
    })
  })

  describe('Todo Editing', () => {
    it('should update title field when setTitle is called', () => {
      // given
      const { result } = renderHook(() => todoDetailsViewModel(dependencies))

      // when
      act(() => result.current.setTitle('New task title'))

      // then
      expect(result.current.title).toBe('New task title')
    })

    it('should update description field when setDescription is called', () => {
      // given
      const { result } = renderHook(() => todoDetailsViewModel(dependencies))

      // when
      act(() => result.current.setDescription('Updated task description'))

      // then
      expect(result.current.description).toBe('Updated task description')
    })

    it('should save todo with updated fields when update is triggered', async () => {
      // given
      const todo = { id: '1', title: 'Original', description: 'Original desc' }
      const updatedTitle = 'Updated title'
      const updatedDescription = 'Updated description'

      vi.spyOn(Router, 'useParams').mockReturnValue({ id: todo.id })
      vi.spyOn(getTodoUseCase, 'execute').mockReturnValue(Promise.resolve(todo))

      const updateSpy = vi.spyOn(updateTodoUseCase, 'execute').mockResolvedValue(todo)
      const navigateSpy = vi.fn()
      vi.spyOn(Router, 'useNavigate').mockReturnValue(navigateSpy)

      const { result } = renderHook(() => todoDetailsViewModel(dependencies))

      // wait for initial load
      await waitFor(() => expect(result.current.title).toBe(todo.title))

      // when
      act(() => result.current.setTitle(updatedTitle))
      act(() => result.current.setDescription(updatedDescription))
      await act(() => result.current.updateTodo())

      // then
      expect(updateSpy).toHaveBeenCalledWith({
        id: todo.id,
        title: updatedTitle,
        description: updatedDescription,
      })
      expect(navigateSpy).toHaveBeenCalledWith('/')
    })
  })

  describe('Todo Deletion', () => {
    it('should initialize with delete dialog closed', () => {
      // when
      const { result } = renderHook(() => todoDetailsViewModel(dependencies))

      // then
      expect(result.current.isDeleteDialogOpen).toBe(false)
    })

    it.each([
      [true],
      [false],
    ])('should set delete dialog open state to %s', (isOpen) => {
      // given
      const { result } = renderHook(() => todoDetailsViewModel(dependencies))

      // when
      act(() => result.current.setIsDeleteDialogOpen(isOpen))

      // then
      expect(result.current.isDeleteDialogOpen).toBe(isOpen)
    })

    it('should delete todo and navigate away when deletion is confirmed', async () => {
      // given
      const todo = { id: '1', title: 'Todo to delete', description: 'Will be removed' }

      vi.spyOn(Router, 'useParams').mockReturnValue({ id: todo.id })
      vi.spyOn(getTodoUseCase, 'execute').mockReturnValue(Promise.resolve(todo))

      const deleteSpy = vi.spyOn(deleteTodoUseCase, 'execute').mockResolvedValue()
      const navigateSpy = vi.fn()
      vi.spyOn(Router, 'useNavigate').mockReturnValue(navigateSpy)

      const { result } = renderHook(() => todoDetailsViewModel(dependencies))

      // wait for initial load
      await waitFor(() => expect(result.current.title).toBe(todo.title))

      // when
      await act(() => result.current.deleteTodo())

      // then
      expect(deleteSpy).toHaveBeenCalledWith(todo.id)
      expect(navigateSpy).toHaveBeenCalledWith('/')
    })
  })

  describe('Prevention Logic', () => {
    it('should prevent update when no todo id is available', async () => {
      // given - mock useParams to return undefined BEFORE creating the hook
      const useParamsMock = vi.spyOn(Router, 'useParams').mockReturnValue({ id: undefined })
      vi.spyOn(Router, 'useNavigate').mockReturnValue(vi.fn())

      const updateSpy = vi.fn()
      const testDependencies = {
        getTodoUseCase: { execute: vi.fn() } as UseCaseWithParams<Todo, Id>,
        updateTodoUseCase: { execute: updateSpy } as UseCaseWithParams<Todo, Todo>,
        deleteTodoUseCase: { execute: vi.fn() } as UseCaseWithParams<void, Id>,
      }

      // when
      const { result } = renderHook(() => todoDetailsViewModel(testDependencies))
      await act(() => result.current.updateTodo())

      // then
      expect(useParamsMock).toHaveBeenCalled()
      expect(updateSpy).not.toHaveBeenCalled()
    })

    it('should prevent deletion when no todo id is available', async () => {
      // given - mock useParams to return undefined BEFORE creating the hook
      const useParamsMock = vi.spyOn(Router, 'useParams').mockReturnValue({ id: undefined })
      vi.spyOn(Router, 'useNavigate').mockReturnValue(vi.fn())

      const deleteSpy = vi.fn()
      const testDependencies = {
        getTodoUseCase: { execute: vi.fn() } as UseCaseWithParams<Todo, Id>,
        updateTodoUseCase: { execute: vi.fn() } as UseCaseWithParams<Todo, Todo>,
        deleteTodoUseCase: { execute: deleteSpy } as UseCaseWithParams<void, Id>,
      }

      // when
      const { result } = renderHook(() => todoDetailsViewModel(testDependencies))
      await act(() => result.current.deleteTodo())

      // then
      expect(useParamsMock).toHaveBeenCalled()
      expect(deleteSpy).not.toHaveBeenCalled()
    })
  })
})
