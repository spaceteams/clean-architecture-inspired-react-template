import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ITodoRepository } from '../../repository/ITodoRepository.ts'
import { getTodosUseCase } from './getTodosUseCase.ts'

describe('GetTodosUseCase', () => {
  const mockGet = vi.fn()
  const mockRepository = { get: mockGet } as unknown as ITodoRepository
  const useCase = getTodosUseCase({ todoRepository: mockRepository })

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should retrieve all todos from repository', async () => {
    // given
    const expectedTodos = [
      { id: '1', title: 'Todo 1', description: 'description 1' },
      { id: '2', title: 'Todo 2', description: 'description 2' },
    ]
    mockGet.mockResolvedValueOnce(expectedTodos)

    // when
    const result = await useCase.execute()

    // then
    expect(result).toEqual(expectedTodos)
    expect(mockGet).toHaveBeenCalledOnce()
  })

  it('should propagate repository errors when todo retrieval fails', async () => {
    // given
    const expectedError = new Error('Repository connection failed')
    mockGet.mockRejectedValueOnce(expectedError)

    // when / then
    await expect(useCase.execute()).rejects.toThrow('Repository connection failed')
    expect(mockGet).toHaveBeenCalledOnce()
  })
})
