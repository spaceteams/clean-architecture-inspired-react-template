import { Todo } from '../../model/Todo.ts'
import { UseCaseWithParams } from '../../model/types'
import { ITodoRepository } from '../../repository/ITodoRepository.ts'

type Dependencies = {
  readonly todoRepository: ITodoRepository
}

export const updateTodoUseCase = ({ todoRepository }: Dependencies): UseCaseWithParams<Todo, Todo> => ({
  execute: ({ id, title, description }) => todoRepository.update(id, title, description),
})
