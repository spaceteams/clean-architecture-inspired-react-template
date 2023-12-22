import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Todo } from '../../../domain/model/Todo.ts'
import { Id, UseCaseWithParams } from '../../../domain/model/types'

type Dependencies = {
  readonly getTodoUseCase: UseCaseWithParams<Todo, Id>
  readonly updateTodoUseCase: UseCaseWithParams<Todo, Todo>
  readonly deleteTodoUseCase: UseCaseWithParams<Todo[], Id>
}

export const todoDetailsViewModel = ({ getTodoUseCase, updateTodoUseCase, deleteTodoUseCase }: Dependencies) => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const getAndSetTodo = async(todoId: Id) => {
    const todo = await getTodoUseCase.execute(todoId)
    setTitle(todo.title)
    setDescription(todo.description)
  }

  const updateTodo = async() => {
    if (id !== undefined) {
      await updateTodoUseCase.execute({ id, title, description })
      navigate('/')
    }
  }

  const deleteTodo = async() => {
    if (id !== undefined) {
      await deleteTodoUseCase.execute(id)
      navigate('/')
    }
  }

  useEffect(() => {
    if (id !== undefined) {
      void getAndSetTodo(id)
    }
  }, [id])

  return { title, setTitle, description, setDescription, updateTodo, deleteTodo }
}
