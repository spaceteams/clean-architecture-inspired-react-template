import { useEffect, useState } from 'react'
import { Todo } from '../../../domain/model/Todo.ts'
import { Id, UseCase, UseCaseWithParams } from '../../../domain/model/types'

type Dependencies = {
  readonly getTodosUseCase: UseCase<Todo[]>
  readonly deleteTodoUseCase: UseCaseWithParams<void, Id>
}

export const todoListViewModel = ({ getTodosUseCase, deleteTodoUseCase }: Dependencies) => {
  const [todoToDelete, setTodoToDelete] = useState<Todo>()
  const [todos, setTodos] = useState<Todo[]>([])

  const showDeleteDialog = (todo: Todo) => setTodoToDelete(todo)

  const closeDeleteDialog = () => setTodoToDelete(undefined)

  const getTodos = async () => {
    const result = await getTodosUseCase.execute()
    setTodos(result)
  }

  const deleteTodo = async () => {
    if (todoToDelete !== undefined) {
      await deleteTodoUseCase.execute(todoToDelete.id)
      setTodos(todos.filter(todo => todo.id !== todoToDelete.id))
      closeDeleteDialog()
    }
  }

  const sortById = (prevTodo: Todo, todo: Todo) => prevTodo.id < todo.id ? -1 : prevTodo.id > todo.id ? 1 : 0

  useEffect(() => {
    void getTodos()
  }, [])

  return { todos: todos.sort(sortById), deleteTodo, showDeleteDialog, closeDeleteDialog, todoToDelete }
}
