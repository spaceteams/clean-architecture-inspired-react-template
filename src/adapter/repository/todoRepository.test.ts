import { beforeEach, describe, expect, it, vi } from 'vitest'
import { DI } from '../../di/ioc.ts'

const repository = DI.resolve('todoRepository')

const todos = [
  { id: '1', title: 'Todo 1', description: 'description 1' },
  { id: '2', title: 'Todo 2', description: 'description 2' },
  { id: '3', title: 'Todo 3', description: 'description 3' },
]

beforeEach(() => {
  localStorage.clear()
  localStorage.setItem('todos', JSON.stringify(todos))

  vi.useFakeTimers()
  vi.setSystemTime(new Date('2011-11-11T11:11:11.000Z'))
})

describe('TodoRepository', () => {
  describe('get', () => {
    it('should return all todos when todos exist', async () => {
      // when
      const result = await repository.get()

      // then
      expect(result).toEqual(todos)
    })

    it('should return empty array when no todos exist', async () => {
      // given
      localStorage.setItem('todos', '[]')

      // when
      const result = await repository.get()

      // then
      expect(result).toEqual([])
    })

    it('should handle corrupted data gracefully', async () => {
      // given
      localStorage.setItem('todos', '{invalid json')

      // when / then
      await expect(repository.get()).rejects.toThrow()
    })
  })

  describe('getById', () => {
    it('should return the correct todo when id exists', async () => {
      // when
      const result = await repository.getById(todos[0].id)

      // then
      expect(result).toEqual(todos[0])
    })

    it('should throw error when todo does not exist', async () => {
      // when / then
      await expect(repository.getById('non-existent-id')).rejects.toThrow('Could not find todo with id non-existent-id')
    })
  })

  describe('create', () => {
    it('should create a new todo with generated id', async () => {
      // when
      const result = await repository.create('New Todo', 'New Description')

      // then
      const expectedTodo = { id: '1321009871000', title: 'New Todo', description: 'New Description' }
      expect(result).toEqual(expectedTodo)
    })

    it('should add the new todo to existing todos', async () => {
      // when
      const newTodo = await repository.create('New Todo', 'New Description')

      // then
      const allTodos = await repository.get()
      expect(allTodos).toHaveLength(4)
      expect(allTodos).toContainEqual(newTodo)
    })

    it.each([
      ['Work Task', 'Complete the project documentation'],
      ['Personal', 'Buy groceries for the week'],
      ['Meeting', 'Team standup at 9 AM'],
    ])('should create todo with title "%s" and description "%s"', async (title, description) => {
      // when
      const result = await repository.create(title, description)

      // then
      expect(result.title).toBe(title)
      expect(result.description).toBe(description)
      expect(result.id).toBeDefined()
    })
  })

  describe('update', () => {
    it('should update existing todo with new title and description', async () => {
      // when
      const result = await repository.update(todos[0].id, 'Updated Title', 'Updated Description')

      // then
      const expectedTodo = { ...todos[0], title: 'Updated Title', description: 'Updated Description' }
      expect(result).toEqual(expectedTodo)
    })

    it('should maintain todo count after update', async () => {
      // when
      await repository.update(todos[0].id, 'Updated Title', 'Updated Description')

      // then
      const allTodos = await repository.get()
      expect(allTodos).toHaveLength(3)
    })

    it('should throw error when updating non-existent todo', async () => {
      // when / then
      await expect(
        repository.update('non-existent', 'Title', 'Description'),
      ).rejects.toThrow('Could not find todo with id non-existent')
    })

    it.each([
      ['1', 'First Update', 'First Description'],
      ['2', 'Second Update', 'Second Description'],
      ['3', 'Third Update', 'Third Description'],
    ])('should update todo with id "%s" correctly', async (id, newTitle, newDescription) => {
      // when
      const result = await repository.update(id, newTitle, newDescription)

      // then
      expect(result.id).toBe(id)
      expect(result.title).toBe(newTitle)
      expect(result.description).toBe(newDescription)
    })
  })

  describe('delete', () => {
    it('should remove the specified todo', async () => {
      // when
      await repository.delete(todos[0].id)

      // then
      const allTodos = await repository.get()
      expect(allTodos).toHaveLength(2)
      expect(allTodos).not.toContainEqual(todos[0])
    })

    it('should return undefined when deletion is successful', async () => {
      // when
      const result = await repository.delete(todos[0].id)

      // then
      expect(result).toBeUndefined()
    })

    it('should handle deletion of non-existent todo gracefully', async () => {
      // given
      const initialCount = (await repository.get()).length

      // when
      await repository.delete('non-existent-id')

      // then
      const finalTodos = await repository.get()
      expect(finalTodos).toHaveLength(initialCount)
    })
  })
})
