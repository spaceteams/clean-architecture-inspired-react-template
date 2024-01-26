import { expect, test, vi } from 'vitest'
import { ITodoRepository } from '../../repository/ITodoRepository.ts'
import { getTodoUseCase } from './getTodoUseCase.ts'

const repository = { getById: vi.fn() } as unknown as ITodoRepository
const useCase = getTodoUseCase({ todoRepository: repository })

test('should return a list of todo', async () => {
  // given
  const todo = { id: '1', title: 'Todo', description: 'description' }

  const getByIdSpy = vi.spyOn(repository, 'getById')
  getByIdSpy.mockReturnValueOnce(Promise.resolve(todo))

  // when
  const result = await useCase.execute('1')

  // then
  expect(result).toEqual(todo)
  expect(getByIdSpy).toHaveBeenCalledWith('1')
})

test('should return error if fetching the todos fails', async () => {
  // given
  const getByIdSpy = vi.spyOn(repository, 'getById')
  getByIdSpy.mockReturnValueOnce(Promise.reject(Error('expected error')))

  // when / then
  await expect(useCase.execute('')).rejects.toThrow('expected error')
})
