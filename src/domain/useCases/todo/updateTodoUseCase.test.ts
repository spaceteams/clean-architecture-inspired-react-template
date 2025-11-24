import { describe, expect, it, vi, beforeEach } from 'vitest'
import { ITodoRepository } from '../../repository/ITodoRepository.ts'
import { updateTodoUseCase } from './updateTodoUseCase.ts'

describe('UpdateTodoUseCase', () => {
  const mockRepository = { update: vi.fn() } as unknown as ITodoRepository
  const useCase = updateTodoUseCase({ todoRepository: mockRepository })

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('when updating a todo successfully', () => {
    it('should update todo with new title and description', async () => {
      // given
      const todoUpdate = { id: '1', title: 'Updated Todo', description: 'Updated description' }
      const expectedUpdatedTodo = { id: '1', title: 'Updated Todo', description: 'Updated description' }
      const updateSpy = vi.spyOn(mockRepository, 'update')
      updateSpy.mockResolvedValue(expectedUpdatedTodo)

      // when
      const result = await useCase.execute(todoUpdate)

      // then
      expect(result).toEqual(expectedUpdatedTodo)
      expect(updateSpy).toHaveBeenCalledWith(todoUpdate.id, todoUpdate.title, todoUpdate.description)
    })

    it('should preserve todo ID during update', async () => {
      // given
      const originalId = 'todo-123'
      const todoUpdate = { id: originalId, title: 'New Title', description: 'New Description' }
      const updateSpy = vi.spyOn(mockRepository, 'update')
      updateSpy.mockResolvedValue(todoUpdate)

      // when
      await useCase.execute(todoUpdate)

      // then
      expect(updateSpy).toHaveBeenCalledWith(originalId, expect.any(String), expect.any(String))
    })
  })

  describe('when updating a todo fails', () => {
    it.each([
      ['Database connection error', 'Database connection failed'],
      ['Todo not found', 'Todo with id does not exist'],
      ['Network error', 'Network timeout occurred'],
      ['Validation error', 'Invalid todo data provided'],
    ])('should propagate %s from repository', async (_, errorMessage) => {
      // given
      const todoUpdate = { id: '1', title: 'Title', description: 'Description' }
      const updateSpy = vi.spyOn(mockRepository, 'update')
      updateSpy.mockRejectedValue(new Error(errorMessage))

      // when / then
      await expect(useCase.execute(todoUpdate)).rejects.toThrow(errorMessage)
    })
  })
})
