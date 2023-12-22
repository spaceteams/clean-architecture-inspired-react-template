import { Todo } from '../model/Todo.ts'
import { Id } from '../model/types'

export type ITodoLocalStorageDataSource = {
  readonly getAll: () => Promise<Todo[]>
  readonly getOne: (id: Id) => Promise<Todo>
  readonly createOne: (todo: Omit<Todo, 'id'>) => Promise<Todo>
  readonly updateOne: (id: Id, todo: Partial<Omit<Todo, 'id'>>) => Promise<Todo>
  readonly deleteOne: (id: Id) => Promise<void>
}
