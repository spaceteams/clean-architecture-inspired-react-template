import { act, renderHook } from '@testing-library/react'
import { expect, test, vi } from 'vitest'
import { Todo } from '../../../domain/model/Todo.ts'
import { UseCaseWithParams } from '../../../domain/model/types'
import { createTodoViewModel } from './createTodoViewModel.ts'

const useCase = { execute: () => Promise.resolve() } as unknown as UseCaseWithParams<Todo, Omit<Todo, 'id'>>

test('should create todo', async () => {
  // given / when
  const todoToCreate = { title: '', description: '' }
  const todo = { ...todoToCreate, id: '1' }

  const useCaseSpy = vi.spyOn(useCase, 'execute')
  useCaseSpy.mockReturnValueOnce(Promise.resolve(todo))

  const { result } = renderHook(() => createTodoViewModel({ createTodoUseCase: useCase }))

  await act(() => result.current.createTodo())

  // then
  expect(useCaseSpy).toHaveBeenCalledWith(todoToCreate)
})

test('should create todo with title and description', async () => {
  // given / when
  const todoToCreate = { title: 'Todo', description: 'description' }
  const todo = { ...todoToCreate, id: '1' }

  const useCaseSpy = vi.spyOn(useCase, 'execute')
  useCaseSpy.mockReturnValueOnce(Promise.resolve(todo))

  const { result } = renderHook(() => createTodoViewModel({ createTodoUseCase: useCase }))

  act(() => result.current.setTitle(todo.title))
  act(() => result.current.setDescription(todo.description))

  await act(() => result.current.createTodo())

  // then
  expect(useCaseSpy).toHaveBeenCalledWith(todoToCreate)
})
