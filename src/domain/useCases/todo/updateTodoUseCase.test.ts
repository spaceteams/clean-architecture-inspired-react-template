import { expect, test, vi } from 'vitest'
import { ITodoRepository } from '../../repository/ITodoRepository.ts'
import { updateTodoUseCase } from './updateTodoUseCase.ts'

const repository = { update: vi.fn() } as unknown as ITodoRepository
const useCase = updateTodoUseCase({ todoRepository: repository })

test('should update a todo', async () => {
  // given
  const todo = { id: '1', title: 'Todo', description: 'updated description' }
  const updateSpy = vi.spyOn(repository, 'update')
  updateSpy.mockReturnValueOnce(Promise.resolve(todo))

  // when
  const result = await useCase.execute(todo)

  // then
  expect(result).toEqual(todo)
  expect(updateSpy).toHaveBeenCalledWith(todo.id, todo.title, todo.description)
})

test('should return error if updating a todo fails', async () => {
  // given
  const updateSpy = vi.spyOn(repository, 'update')
  updateSpy.mockReturnValueOnce(Promise.reject(Error('expected error')))

  // when / then
  await expect(useCase.execute({ id: '', title: '', description: '' })).rejects.toThrow('expected error')
})
