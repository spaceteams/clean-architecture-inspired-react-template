import { Todo } from '../../model/Todo.ts'
import { UseCaseWithParams } from '../../model/types'
import { ITodoRepository } from '../../repository/ITodoRepository.ts'

type Dependencies = {
  readonly todoRepository: ITodoRepository
}

export const createTodoUseCase = ({ todoRepository }: Dependencies): UseCaseWithParams<Todo, Omit<Todo, 'id'>> => ({
  execute: ({ title, description }) => todoRepository.create(title, description),
})
