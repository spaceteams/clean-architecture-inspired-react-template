import { expect, test, vi } from 'vitest'
import * as TodoDataSource from '../../data/todoLocalStorageDataSource.ts'
import { DI } from '../../di/ioc.ts'

const repository = DI.resolve('todoRepository')

test('should return a list of all todos', async () => {
  // given
  const todos = [
    { id: '1', title: 'Todo 1', description: 'description 1' },
    { id: '2', title: 'Todo 2', description: 'description 2' },
    { id: '3', title: 'Todo 3', description: 'description 3' },
  ]
  const getAllSpy = vi.spyOn(TodoDataSource, 'getAll')
  getAllSpy.mockReturnValueOnce(Promise.resolve(todos))

  // when
  const result = await repository.get()

  // then
  expect(result).toEqual(todos)
  expect(getAllSpy).toHaveBeenCalled()
})

test('should return an error if fetching all todos fails', async () => {
  // given
  vi.spyOn(TodoDataSource, 'getAll').mockReturnValueOnce(Promise.reject(Error('expected error')))

  // when / then
  await expect(repository.get()).rejects.toThrow('expected error')
})

test("should return a todos by it's id", async () => {
  // given
  const todo = { id: '1', title: 'Todo', description: 'description' }
  const getOneSpy = vi.spyOn(TodoDataSource, 'getOne')
  getOneSpy.mockReturnValueOnce(Promise.resolve(todo))

  // when
  const result = await repository.getById(todo.id)

  // then
  expect(result).toEqual(todo)
  expect(getOneSpy).toHaveBeenCalledWith(todo.id)
})

test('should return an error if fetching all todos fails', async () => {
  // given
  vi.spyOn(TodoDataSource, 'getOne').mockReturnValueOnce(Promise.reject(Error('expected error')))

  // when / then
  await expect(repository.getById('1')).rejects.toThrow('expected error')
})

test('should create todo', async () => {
  // given
  const todo = { id: '1', title: 'Todo', description: 'description' }
  const createOneSpy = vi.spyOn(TodoDataSource, 'createOne')
  createOneSpy.mockReturnValueOnce(Promise.resolve(todo))

  // when
  const result = await repository.create(todo.title, todo.description)

  // then
  expect(result).toEqual(todo)
  expect(createOneSpy).toHaveBeenCalledWith({ title: todo.title, description: todo.description })
})

test('should return an error if creation of an todo fails', async () => {
  // given
  vi.spyOn(TodoDataSource, 'createOne').mockReturnValueOnce(Promise.reject(Error('expected error')))

  // when / then
  await expect(repository.create('', '')).rejects.toThrow('expected error')
})

test('should update todo', async () => {
  // given
  const todo = { id: '1', title: 'Todo', description: 'description' }
  const updateOneSpy = vi.spyOn(TodoDataSource, 'updateOne')
  updateOneSpy.mockReturnValueOnce(Promise.resolve(todo))

  // when
  const result = await repository.update(todo.id, todo.title, todo.description)

  // then
  expect(result).toEqual(todo)
  expect(updateOneSpy).toHaveBeenCalledWith(todo)
})

test('should return an error if updating an todo fails', async () => {
  // given
  vi.spyOn(TodoDataSource, 'updateOne').mockReturnValueOnce(Promise.reject(Error('expected error')))

  // when / then
  await expect(repository.update('', '', '')).rejects.toThrow('expected error')
})

test('should delete a todo', async () => {
  // given
  const deleteOneSpy = vi.spyOn(TodoDataSource, 'deleteOne')
  deleteOneSpy.mockReturnValueOnce(Promise.resolve())

  // when
  const result = await repository.delete('1')

  // then
  expect(result).toBeUndefined()
  expect(deleteOneSpy).toHaveBeenCalledWith('1')
})

test('should return an error if deleting an todo fails', async () => {
  // given
  vi.spyOn(TodoDataSource, 'deleteOne').mockReturnValueOnce(Promise.reject(Error('expected error')))

  // when / then
  await expect(repository.delete('')).rejects.toThrow('expected error')
})
