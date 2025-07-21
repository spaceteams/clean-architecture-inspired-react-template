import { beforeEach, expect, test, vi } from 'vitest'
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

test('should return a list of all todos', async () => {
  // when
  const result = await repository.get()

  // then
  expect(result).toEqual(todos)
})

test('should return empty array when no todos exist', async () => {
  // given
  localStorage.setItem('todos', '[]')

  // when
  const result = await repository.get()

  // then
  expect(result).toEqual([])
})

test('should return error if localStorage contains malformed data', async () => {
  // given
  localStorage.setItem('todos', '{')

  // when / then
  await expect(repository.get()).rejects.toThrow(SyntaxError)
})

test('should return a todo by its id', async () => {
  // when
  const result = await repository.getById(todos[0].id)

  // then
  expect(result).toEqual(todos[0])
})

test('should return error when todo can\'t be found', async () => {
  // when / then
  await expect(repository.getById('not-available')).rejects.toThrow('Could not find todo with id not-available')
})

test('should create todo', async () => {
  // when
  const result = await repository.create('New Todo', 'New Description')

  // then
  const expectedTodo = { id: '1321009871000', title: 'New Todo', description: 'New Description' }
  expect(result).toEqual(expectedTodo)

  const allTodos = await repository.get()
  expect(allTodos).toHaveLength(4)
  expect(allTodos).toContainEqual(expectedTodo)
})

test('should return error when creating todo fails due to localStorage error', async () => {
  // given
  vi.spyOn(Storage.prototype, 'setItem').mockImplementationOnce(() => {
    throw new Error('localStorage error')
  })

  // when / then
  await expect(repository.create('Title', 'Description')).rejects.toThrow('localStorage error')
})

test('should update todo', async () => {
  // when
  const result = await repository.update(todos[0].id, 'Updated Title', 'Updated Description')

  // then
  const expectedTodo = { ...todos[0], title: 'Updated Title', description: 'Updated Description' }
  expect(result).toEqual(expectedTodo)

  const allTodos = await repository.get()
  expect(allTodos).toHaveLength(3)
  expect(allTodos).toContainEqual(expectedTodo)
})

test('should return error when updating non-existent todo', async () => {
  // when / then
  await expect(
    repository.update('non-existent', 'Title', 'Description'),
  ).rejects.toThrow('Could not find todo with id non-existent')
})

test('should return error when updating todo fails due to localStorage error', async () => {
  // given
  vi.spyOn(Storage.prototype, 'setItem').mockImplementationOnce(() => {
    throw new Error('localStorage error')
  })

  // when / then
  await expect(repository.update(todos[0].id, 'Title', 'Description')).rejects.toThrow('localStorage error')
})

test('should delete a todo', async () => {
  // when
  const result = await repository.delete(todos[0].id)

  // then
  expect(result).toBeUndefined()

  const allTodos = await repository.get()
  expect(allTodos).toHaveLength(2)
  expect(allTodos).not.toContainEqual(todos[0])
})

test('should return error when deleting todo fails due to localStorage error', async () => {
  // given
  vi.spyOn(Storage.prototype, 'setItem').mockImplementationOnce(() => {
    throw new Error('localStorage error')
  })

  // when / then
  await expect(repository.delete(todos[0].id)).rejects.toThrow('localStorage error')
})
