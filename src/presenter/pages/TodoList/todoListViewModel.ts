import { useEffect, useState } from 'react'
import { Todo } from '../../../domain/model/Todo.ts'
import { Id, UseCase, UseCaseWithParams } from '../../../domain/model/types'

type Dependencies = {
  readonly getTodosUseCase: UseCase<Todo[]>
  readonly deleteTodoUseCase: UseCaseWithParams<Todo[], Id>
}

export const todoListViewModel = ({ getTodosUseCase, deleteTodoUseCase }: Dependencies) => {
  const [todos, setTodos] = useState<Todo[]>([])

  const getTodos = async() => {
    const result = await getTodosUseCase.execute()
    setTodos(result)
  }

  const deleteTodo = async(id: Id) => {
    await deleteTodoUseCase.execute(id)
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const sortById = (prevTodo: Todo, todo: Todo) => prevTodo.id < todo.id ? -1 : prevTodo.id > todo.id ? 1 : 0

  useEffect(() => {
    void getTodos()
  }, [])

  return { todos: todos.sort(sortById), deleteTodo }
}
