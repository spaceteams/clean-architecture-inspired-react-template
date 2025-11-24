import { describe, expect, it, vi, beforeEach } from 'vitest'
import { ITodoRepository } from '../../repository/ITodoRepository.ts'
import { createTodoUseCase } from './createTodoUseCase.ts'

describe('createTodoUseCase', () => {
  let mockRepository: ITodoRepository
  let useCase: ReturnType<typeof createTodoUseCase>

  beforeEach(() => {
    mockRepository = { create: vi.fn() } as unknown as ITodoRepository
    useCase = createTodoUseCase({ todoRepository: mockRepository })
  })

  it('should delegate todo creation to repository with provided title and description', async () => {
    // given
    const todoInput = { title: 'Learn TypeScript', description: 'Study advanced TypeScript patterns' }
    const createdTodo = { id: 'todo-123', ...todoInput }

    const createSpy = vi.spyOn(mockRepository, 'create')
    createSpy.mockResolvedValue(createdTodo)

    // when
    const result = await useCase.execute(todoInput)

    // then
    expect(result).toEqual(createdTodo)
    expect(createSpy).toHaveBeenCalledWith(todoInput.title, todoInput.description)
  })

  it.each([
    ['empty strings', '', ''],
    ['whitespace only', '   ', '   '],
    ['special characters', 'Todo with @#$%', 'Description with special chars: !@#$%^&*()'],
    ['unicode characters', 'Unicode: 🚀 ✅', 'Description with emoji: 📝 ✨'],
    ['very long content', 'A'.repeat(1000), 'B'.repeat(2000)],
  ])('should handle edge cases: %s', async (_, title, description) => {
    // given
    const todoInput = { title, description }
    const createdTodo = { id: 'edge-case-id', ...todoInput }

    const createSpy = vi.spyOn(mockRepository, 'create')
    createSpy.mockResolvedValue(createdTodo)

    // when
    const result = await useCase.execute(todoInput)

    // then
    expect(result).toEqual(createdTodo)
    expect(createSpy).toHaveBeenCalledWith(title, description)
  })

  it('should propagate repository errors when todo creation fails', async () => {
    // given
    const todoInput = { title: 'Failed Todo', description: 'This will fail' }
    const repositoryError = new Error('Database connection failed')

    const createSpy = vi.spyOn(mockRepository, 'create')
    createSpy.mockRejectedValue(repositoryError)

    // when / then
    await expect(useCase.execute(todoInput)).rejects.toThrow('Database connection failed')
    expect(createSpy).toHaveBeenCalledWith(todoInput.title, todoInput.description)
  })
})
