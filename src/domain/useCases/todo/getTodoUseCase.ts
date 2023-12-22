import { Todo } from '../../model/Todo.ts'
import { Id, UseCaseWithParams } from '../../model/types'
import { ITodoRepository } from '../../repository/ITodoRepository.ts'

type Dependencies = {
  readonly todoRepository: ITodoRepository
}

export const getTodoUseCase = ({ todoRepository }: Dependencies): UseCaseWithParams<Todo, Id> => ({
  execute: (id) => todoRepository.getById(id),
})
