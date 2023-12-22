import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Todo } from '../../../domain/model/Todo.ts'
import { UseCaseWithParams } from '../../../domain/model/types'

type Dependencies = {
  readonly createTodoUseCase: UseCaseWithParams<Todo, Omit<Todo, 'id'>>
}

export const createTodoViewModel = ({ createTodoUseCase }: Dependencies) => {
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const createTodo = async() => {
    await createTodoUseCase.execute({ title, description })
    setTitle('')
    setDescription('')
    navigate('/')
  }

  return { setTitle, setDescription, createTodo }
}
