import { expect, test, vi } from 'vitest'
import { ITodoRepository } from '../../repository/ITodoRepository.ts'
import { deleteTodoUseCase } from './deleteTodoUseCase.ts'

const repository = { delete: vi.fn() } as unknown as ITodoRepository
const useCase = deleteTodoUseCase({ todoRepository: repository })

test('should delete a todo', async () => {
  // given
  const deleteSpy = vi.spyOn(repository, 'delete')
  deleteSpy.mockReturnValueOnce(Promise.resolve())

  // when
  const result = await useCase.execute('1')

  // then
  expect(result).toBeUndefined()
  expect(deleteSpy).toHaveBeenCalledWith('1')
})

test('should return error if creating a todo fails', async () => {
  // given
  const deleteSpy = vi.spyOn(repository, 'delete')
  deleteSpy.mockReturnValueOnce(Promise.reject(Error('expected error')))

  // when / then
  await expect(useCase.execute('')).rejects.toThrow('expected error')
})
