import { act, renderHook, waitFor } from '@testing-library/react'
import * as Router from 'react-router'
import { expect, test, vi } from 'vitest'
import { Todo } from '../../../domain/model/Todo.ts'
import { Id, UseCaseWithParams } from '../../../domain/model/types'
import { todoDetailsViewModel } from './todoDetailsViewModel.ts'

const getTodoUseCase = { execute: () => Promise.resolve() } as unknown as UseCaseWithParams<Todo, Id>
const updateTodoUseCase = { execute: () => Promise.resolve() } as unknown as UseCaseWithParams<Todo, Todo>
const deleteTodoUseCase = { execute: () => Promise.resolve() } as unknown as UseCaseWithParams<void, Id>

test('should set initial title and description', async () => {
  // given / when
  const todo = { id: '1', title: 'Todo', description: 'description' }
  vi.spyOn(Router, 'useParams').mockReturnValue({ id: todo.id })
  vi.spyOn(getTodoUseCase, 'execute').mockReturnValue(Promise.resolve(todo))

  const { result } = renderHook(() => todoDetailsViewModel({ getTodoUseCase, updateTodoUseCase, deleteTodoUseCase }))

  // then
  await waitFor(() => {
    expect(result.current.title).toEqual(todo.title)
    expect(result.current.description).toEqual(todo.description)
  })
})

test('should set title and description', async () => {
  // given
  const { result } = renderHook(() => todoDetailsViewModel({ getTodoUseCase, updateTodoUseCase, deleteTodoUseCase }))

  // ensure title and description are empty
  expect(result.current.title).toEqual('')
  expect(result.current.description).toEqual('')

  // when
  act(() => result.current.setTitle('test-title'))
  act(() => result.current.setDescription('test-description'))

  // then
  await waitFor(() => {
    expect(result.current.title).toEqual('test-title')
    expect(result.current.description).toEqual('test-description')
  })
})

test('should initially mark delete dialog as closed', async () => {
  // given / when
  const { result } = renderHook(() => todoDetailsViewModel({ getTodoUseCase, updateTodoUseCase, deleteTodoUseCase }))

  // then
  await waitFor(() => {
    expect(result.current.isDeleteDialogOpen).toEqual(false)
  })
})

test('should open delete dialog', async () => {
  // given
  const { result } = renderHook(() => todoDetailsViewModel({ getTodoUseCase, updateTodoUseCase, deleteTodoUseCase }))

  // when
  act(() => result.current.setIsDeleteDialogOpen(true))

  // then
  await waitFor(() => {
    expect(result.current.isDeleteDialogOpen).toEqual(true)
  })
})

test('should update todo', async () => {
  // given
  const todo = { id: '1', title: 'Todo', description: 'description' }
  const updatedTodo = { ...todo, title: 'updated-title', description: 'updated-description' }

  vi.spyOn(Router, 'useParams').mockReturnValue({ id: todo.id })
  vi.spyOn(getTodoUseCase, 'execute').mockReturnValue(Promise.resolve(todo))

  const updateTodoSpy = vi.spyOn(updateTodoUseCase, 'execute')
  updateTodoSpy.mockReturnValue(Promise.resolve(updatedTodo))

  const { result } = renderHook(() => todoDetailsViewModel({ getTodoUseCase, updateTodoUseCase, deleteTodoUseCase }))

  // ensure title and description are set
  await waitFor(() => {
    expect(result.current.title).toEqual(todo.title)
    expect(result.current.description).toEqual(todo.description)
  })

  // when
  act(() => result.current.setTitle(updatedTodo.title))
  act(() => result.current.setDescription(updatedTodo.description))
  await act(() => result.current.updateTodo())

  // then
  expect(updateTodoSpy).toHaveBeenCalledWith(updatedTodo)
})

test('should not call update use case if no todo is available', async () => {
  // given
  vi.spyOn(Router, 'useParams').mockReturnValue({ id: undefined })
  const updateTodoSpy = vi.spyOn(updateTodoUseCase, 'execute')

  const { result } = renderHook(() => todoDetailsViewModel({ getTodoUseCase, updateTodoUseCase, deleteTodoUseCase }))

  // when
  await act(() => result.current.updateTodo())

  // then
  expect(updateTodoSpy).not.toHaveBeenCalled()
})

test('should delete todo', async () => {
  // given
  const todo = { id: '1', title: 'Todo', description: 'description' }

  vi.spyOn(Router, 'useParams').mockReturnValue({ id: todo.id })
  vi.spyOn(getTodoUseCase, 'execute').mockReturnValue(Promise.resolve(todo))

  const deleteTodoSpy = vi.spyOn(deleteTodoUseCase, 'execute')
  deleteTodoSpy.mockReturnValue(Promise.resolve())

  const { result } = renderHook(() => todoDetailsViewModel({ getTodoUseCase, updateTodoUseCase, deleteTodoUseCase }))

  // ensure title and description are set
  await waitFor(() => {
    expect(result.current.title).toEqual(todo.title)
    expect(result.current.description).toEqual(todo.description)
  })

  // when
  await act(() => result.current.deleteTodo())

  // then
  expect(deleteTodoSpy).toHaveBeenCalledWith(todo.id)
})

test('should not call delete use case if no todo is available', async () => {
  // given
  vi.spyOn(Router, 'useParams').mockReturnValue({ id: undefined })
  const deleteTodoSpy = vi.spyOn(deleteTodoUseCase, 'execute')

  const { result } = renderHook(() => todoDetailsViewModel({ getTodoUseCase, updateTodoUseCase, deleteTodoUseCase }))

  // when
  await act(() => result.current.deleteTodo())

  // then
  expect(deleteTodoSpy).not.toHaveBeenCalled()
})
