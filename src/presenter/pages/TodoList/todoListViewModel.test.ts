import { act, renderHook, waitFor } from '@testing-library/react'
import { beforeEach, expect, test, vi } from 'vitest'
import { Todo } from '../../../domain/model/Todo.ts'
import { Id, UseCase, UseCaseWithParams } from '../../../domain/model/types'
import { todoListViewModel } from './todoListViewModel.ts'

const todos = [
  { id: '1', title: 'Todo 1', description: 'description 1' },
  { id: '2', title: 'Todo 2', description: 'description 2' },
]

const getTodosUseCase = { execute: () => Promise.resolve() } as unknown as UseCase<Todo[]>
const deleteTodoUseCase = { execute: () => Promise.resolve() } as unknown as UseCaseWithParams<void, Id>

beforeEach(() => {
  vi.spyOn(getTodosUseCase, 'execute').mockReturnValue(Promise.resolve(todos))
})

test('should set initial todos', async () => {
  // given / when
  const { result } = renderHook(() => todoListViewModel({ getTodosUseCase, deleteTodoUseCase }))

  // then
  await waitFor(() => {
    expect(result.current.todos).toEqual(todos)
  })
})

test('should sort todos by id', async () => {
  // given / when
  vi.spyOn(getTodosUseCase, 'execute').mockReturnValue(Promise.resolve([
    { id: 'B', title: '', description: '' },
    { id: 'C', title: '', description: '' },
    { id: 'A', title: '', description: '' },
    { id: 'D', title: '', description: '' },
  ]))

  const { result } = renderHook(() => todoListViewModel({ getTodosUseCase, deleteTodoUseCase }))

  // then
  await waitFor(() => {
    expect(result.current.todos.map(({ id }) => id)).toEqual(['A', 'B', 'C', 'D'])
  })
})

test('should open delete dialog by setting the todo to delete', async () => {
  // given / when
  const { result } = renderHook(() => todoListViewModel({ getTodosUseCase, deleteTodoUseCase }))

  // when
  act(() => result.current.showDeleteDialog(todos[0]))

  // then
  await waitFor(() => {
    expect(result.current.todoToDelete).toEqual(todos[0])
  })
})

test('should close delete dialog by resetting the todo to delete', async () => {
  // given / when
  const { result } = renderHook(() => todoListViewModel({ getTodosUseCase, deleteTodoUseCase }))

  act(() => result.current.showDeleteDialog(todos[0]))
  await waitFor(() => {
    expect(result.current.todoToDelete).toEqual(todos[0])
  })

  // when
  act(() => result.current.closeDeleteDialog())

  // then
  await waitFor(() => {
    expect(result.current.todoToDelete).toBeUndefined()
  })
})

test('should delete a todo, close the delete dialog by resetting the todo to delete and update the todo list',
  async () => {
  // given
    const deleteTodoUseCaseSpy = vi.spyOn(deleteTodoUseCase, 'execute')

    const { result } = renderHook(() => todoListViewModel({ getTodosUseCase, deleteTodoUseCase }))

    // when
    act(() => result.current.showDeleteDialog(todos[0]))
    await waitFor(() => {
      expect(result.current.todoToDelete).toEqual(todos[0])
    })
    await act(() => result.current.deleteTodo())

    // then
    expect(deleteTodoUseCaseSpy).toHaveBeenCalledWith(todos[0].id)
    expect(result.current.todoToDelete).toBeUndefined()
    expect(result.current.todos).toHaveLength(1)
    expect(result.current.todos[0].id).toEqual(todos[1].id)
  })
