import { expect, test, vi } from 'vitest'
import { ITodoRepository } from '../../repository/ITodoRepository.ts'
import { createTodoUseCase } from './createTodoUseCase.ts'

const repository = { create: vi.fn() } as unknown as ITodoRepository
const useCase = createTodoUseCase({ todoRepository: repository })

test('should create todo', async () => {
  // given
  const todo = { title: 'todo-title', description: 'todo-description' }
  const createdTodo = { id: '1', ...todo }

  const createSpy = vi.spyOn(repository, 'create')
  createSpy.mockReturnValueOnce(Promise.resolve(createdTodo))

  // when
  const result = await useCase.execute(todo)

  // then
  expect(result).toEqual(createdTodo)
  expect(createSpy).toHaveBeenCalledWith(todo.title, todo.description)
})

test('should return error if creating a todo fails', async () => {
  // given
  const createSpy = vi.spyOn(repository, 'create')
  createSpy.mockReturnValueOnce(Promise.reject(Error('expected error')))

  // when / then
  await expect(useCase.execute({ title: '', description: '' })).rejects.toThrow('expected error')
})
