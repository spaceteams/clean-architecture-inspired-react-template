import { expect, describe, it, vi, beforeEach } from 'vitest'
import { ITodoRepository } from '../../repository/ITodoRepository.ts'
import { getTodoUseCase } from './getTodoUseCase.ts'

describe('getTodoUseCase', () => {
  let repository: ITodoRepository
  let useCase: ReturnType<typeof getTodoUseCase>
  let getByIdSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    repository = { getById: vi.fn() } as unknown as ITodoRepository
    useCase = getTodoUseCase({ todoRepository: repository })
    getByIdSpy = vi.spyOn(repository, 'getById')
  })

  it('should retrieve todo by id when todo exists', async () => {
    // given
    const expectedTodo = { id: '1', title: 'Todo', description: 'description' }
    getByIdSpy.mockResolvedValue(expectedTodo)

    // when
    const result = await useCase.execute('1')

    // then
    expect(result).toEqual(expectedTodo)
    expect(getByIdSpy).toHaveBeenCalledWith('1')
  })

  it('should propagate error when repository fails to retrieve todo', async () => {
    // given
    const expectedError = new Error('Todo not found')
    getByIdSpy.mockRejectedValue(expectedError)

    // when / then
    await expect(useCase.execute('nonexistent-id')).rejects.toThrow('Todo not found')
    expect(getByIdSpy).toHaveBeenCalledWith('nonexistent-id')
  })
})
