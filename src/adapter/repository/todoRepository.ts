import { ITodoLocalStorageDataSource } from '../../domain/data/ITodoLocalStorageDataSource.ts'
import { Id } from '../../domain/model/types'
import { ITodoRepository } from '../../domain/repository/ITodoRepository.ts'

type Dependencies = {
  readonly todoDataSource: ITodoLocalStorageDataSource
}

export const todoRepository = ({ todoDataSource }: Dependencies): ITodoRepository => {
  const get = () => todoDataSource.getAll()

  const getById = (id: Id) => todoDataSource.getOne(id)

  const create = (title: string, description: string) =>
    todoDataSource.createOne({ title, description })

  const update = (id: Id, title: string, description: string) =>
    todoDataSource.updateOne(id, { title, description })

  const deleteTodo = (id: Id) => todoDataSource.deleteOne(id)

  return { get, getById, create, update, delete: deleteTodo }
}
