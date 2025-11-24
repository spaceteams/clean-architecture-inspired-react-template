import { Todo } from '../../domain/model/Todo.ts'
import { Id } from '../../domain/model/types'
import { ITodoRepository } from '../../domain/repository/ITodoRepository.ts'

export const todoRepository = (): ITodoRepository => {
  const COLLECTION_NAME: string = 'todos'

  const get = async (): Promise<Todo[]> => {
    const result = localStorage.getItem(COLLECTION_NAME)
    return (result !== null ? JSON.parse(result) : []) as Todo[]
  }

  const getById = async (id: Id): Promise<Todo> => {
    const todos = await get()
    const todo = todos.find(({ id: todoId }) => todoId === id)

    if (todo === undefined) {
      throw Error(`Could not find todo with id ${id}`)
    }
    return todo
  }

  const create = async (title: string, description: string): Promise<Todo> => {
    const todos = await get()

    const id = `${Date.now()}`
    const newTodo: Todo = { title, description, id }

    localStorage.setItem(COLLECTION_NAME, JSON.stringify([...todos, newTodo]))

    return newTodo
  }

  const update = async (id: Id, title: string, description: string): Promise<Todo> => {
    const updatedTodo = { ...await getById(id), title, description }
    const todos = (await get()).filter(({ id: todoId }) => todoId !== id)

    localStorage.setItem(COLLECTION_NAME, JSON.stringify([...todos, updatedTodo]))

    return updatedTodo
  }

  const deleteTodo = async (id: Id): Promise<void> => {
    const todos = (await get()).filter(({ id: todoId }) => todoId !== id)

    localStorage.setItem(COLLECTION_NAME, JSON.stringify(todos))
  }

  return { get, getById, create, update, delete: deleteTodo }
}
