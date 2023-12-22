import { expect, test, beforeEach, vi } from 'vitest'
import { Todo } from '../domain/model/Todo.ts'
import { createOne, deleteOne, getAll, getOne, updateOne } from './todoLocalStorageDataSource.ts'

const todos: Todo[] = [
  { id: '1', title: 'Todo 1', description: 'description 1' },
  { id: '2', title: 'Todo 2', description: 'description 2' },
  { id: '3', title: 'Todo 3', description: 'description 3' },
]

beforeEach(() => {
  localStorage.setItem('todos', JSON.stringify(todos))

  vi.useFakeTimers()
  vi.setSystemTime(new Date('2011-11-11T11:11:11.000Z'))
})

test('should return all todos', async () => {
  // given / when
  const result = await getAll()

  // then
  expect(result).toEqual(todos)
})

test('should return empty list if no todos are available', async () => {
  // given
  localStorage.setItem('todos', '[]')

  // when
  const result = await getAll()

  // then
  expect(result).toEqual([])
})

test('should return error when fetching all if todos are malformed', async () => {
  // given
  localStorage.setItem('todos', '{')

  // when / then
  await expect(getAll()).rejects.toThrow('Unexpected end of JSON input')
})

test("should return todo by it's id", async () => {
  // given / when
  const result = await getOne(todos[0].id)

  // then
  expect(result).toEqual(todos[0])
})

test("should return error when a todo can't be found", async () => {
  // given / when / then
  await expect(getOne('not-available')).rejects.toThrow('Could not find todo with id not-available')
})

test('should create a todo', async () => {
  // given / when
  const todoToCreate = { title: 'test-todo', description: 'test-description' }
  const result = await createOne(todoToCreate)

  // then
  const createdTodo = { id: '1321009871000', ...todoToCreate }
  expect(result).toEqual(createdTodo)
  expect(await getAll()).toEqual([...todos, createdTodo])
})

test('should return error when creating a todo fails', async () => {
  // given / when / then
  vi.spyOn(window.localStorage.__proto__, 'setItem').mockImplementationOnce(() => {
    throw Error('expected error')
  })

  await expect(createOne({ title: '', description: '' })).rejects.toThrow('expected error')
})

test('should update a todo', async () => {
  // given / when
  const result = await updateOne(todos[0].id, { description: 'updated description' })

  // then
  expect(result).toEqual({ ...todos[0], description: 'updated description' })
  expect(await getAll()).toEqual([...todos.slice(1), result])
})

test("should return error when todo to update can't be found", async () => {
  // given / when / then
  await expect(updateOne('', {})).rejects.toThrow('Could not find todo with id ')
})

test('should return error when updating a todo fails', async () => {
  // given / when / then
  vi.spyOn(window.localStorage.__proto__, 'setItem').mockImplementationOnce(() => {
    throw Error('expected error')
  })

  await expect(updateOne(todos[0].id, {})).rejects.toThrow('expected error')
})

test('should delete a todo', async () => {
  // given / when
  const result = await deleteOne(todos[0].id)

  // then
  expect(result).toBeUndefined()
  expect(await getAll()).toEqual(todos.slice(1))
})

test('should return error when deleting a todo fails', async () => {
  // given / when / then
  vi.spyOn(window.localStorage.__proto__, 'setItem').mockImplementationOnce(() => {
    throw Error('expected error')
  })

  await expect(deleteOne('')).rejects.toThrow('expected error')
})
