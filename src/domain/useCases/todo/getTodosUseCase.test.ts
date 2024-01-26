import { expect, test, vi } from 'vitest'
import { ITodoRepository } from '../../repository/ITodoRepository.ts'
import { getTodosUseCase } from './getTodosUseCase.ts'

const repository = { get: vi.fn() } as unknown as ITodoRepository
const useCase = getTodosUseCase({ todoRepository: repository })

test('should return a list of todo', async () => {
  // given
  const todos = [
    { id: '1', title: 'Todo 1', description: 'description 1' },
    { id: '2', title: 'Todo 2', description: 'description 2' },
  ]

  const getSpy = vi.spyOn(repository, 'get')
  getSpy.mockReturnValueOnce(Promise.resolve(todos))

  // when
  const result = await useCase.execute()

  // then
  expect(result).toEqual(todos)
  expect(getSpy).toHaveBeenCalled()
})

test('should return error if fetching the todos fails', async () => {
  // given
  const getSpy = vi.spyOn(repository, 'get')
  getSpy.mockReturnValueOnce(Promise.reject(Error('expected error')))

  // when / then
  await expect(useCase.execute()).rejects.toThrow('expected error')
})
