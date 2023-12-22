import { Todo } from '../../model/Todo.ts'
import { UseCase } from '../../model/types'
import { ITodoRepository } from '../../repository/ITodoRepository.ts'

type Dependencies = {
  readonly todoRepository: ITodoRepository
}

export const getTodosUseCase = ({ todoRepository }: Dependencies): UseCase<Todo[]> => ({
  execute: () => todoRepository.get(),
})
