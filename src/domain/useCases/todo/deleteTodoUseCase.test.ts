import { expect, describe, it, vi, beforeEach } from 'vitest'
import { ITodoRepository } from '../../repository/ITodoRepository.ts'
import { deleteTodoUseCase } from './deleteTodoUseCase.ts'

describe('deleteTodoUseCase', () => {
  let repository: ITodoRepository
  let useCase: ReturnType<typeof deleteTodoUseCase>
  let deleteSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    repository = { delete: vi.fn() } as unknown as ITodoRepository
    useCase = deleteTodoUseCase({ todoRepository: repository })
    deleteSpy = vi.spyOn(repository, 'delete')
  })

  it('should delete a todo successfully', async () => {
    // given
    const todoId = '1'
    deleteSpy.mockReturnValueOnce(Promise.resolve())

    // when
    const result = await useCase.execute(todoId)

    // then
    expect(result).toBeUndefined()
    expect(deleteSpy).toHaveBeenCalledWith(todoId)
    expect(deleteSpy).toHaveBeenCalledTimes(1)
  })

  it('should propagate error when deletion fails', async () => {
    // given
    const todoId = 'invalid-id'
    const expectedError = new Error('Todo not found')
    deleteSpy.mockReturnValueOnce(Promise.reject(expectedError))

    // when / then
    await expect(useCase.execute(todoId)).rejects.toThrow('Todo not found')
    expect(deleteSpy).toHaveBeenCalledWith(todoId)
    expect(deleteSpy).toHaveBeenCalledTimes(1)
  })
})
