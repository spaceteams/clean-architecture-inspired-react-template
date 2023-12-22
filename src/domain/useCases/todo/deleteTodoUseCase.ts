import { Id, UseCaseWithParams } from '../../model/types'
import { ITodoRepository } from '../../repository/ITodoRepository.ts'

type Dependencies = {
  readonly todoRepository: ITodoRepository
}

export const deleteTodoUseCase = ({ todoRepository }: Dependencies): UseCaseWithParams<void, Id> => ({
  execute: (id: Id) => todoRepository.delete(id),
})
