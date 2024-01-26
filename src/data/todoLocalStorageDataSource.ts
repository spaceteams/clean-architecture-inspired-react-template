import { Todo } from '../domain/model/Todo.ts'
import { Id } from '../domain/model/types'

const COLLECTION_NAME: string = 'todos'

export const getAll = (): Promise<Todo[]> => {
  try {
    const result = localStorage.getItem(COLLECTION_NAME)
    return result !== null ? JSON.parse(result) : []
  } catch (error) {
    return Promise.reject(error)
  }
}

export const getOne = async (id: Id): Promise<Todo> => {
  const todos = await getAll()
  const todo = todos.find(({ id: todoId }) => todoId === id)

  if (todo === undefined) {
    throw Error(`Could not find todo with id ${id}`)
  }
  return todo
}

export const createOne = async (todo: Omit<Todo, 'id'>): Promise<Todo> => {
  const todos = await getAll()

  const id = `${Date.now()}`
  const newTodo = { ...todo, id }

  localStorage.setItem(COLLECTION_NAME, JSON.stringify([...todos, newTodo]))

  return newTodo
}

export const updateOne = async (id: Id, todo: Partial<Omit<Todo, 'id'>>): Promise<Todo> => {
  const updatedTodo = { ...await getOne(id), ...todo }
  const todos = (await getAll()).filter(({ id: todoId }) => todoId !== id)

  localStorage.setItem(COLLECTION_NAME, JSON.stringify([...todos, updatedTodo]))

  return updatedTodo
}

export const deleteOne = async (id: Id): Promise<void> => {
  const todos = (await getAll()).filter(({ id: todoId }) => todoId !== id)

  localStorage.setItem(COLLECTION_NAME, JSON.stringify(todos))
}
