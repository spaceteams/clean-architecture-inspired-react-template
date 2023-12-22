import { Todo } from '../model/Todo.ts'
import { Id } from '../model/types'

export interface ITodoRepository {
  get: () => Promise<Todo[]>
  getById: (id: Id) => Promise<Todo>
  create: (title: string, label: string) => Promise<Todo>
  update: (id: Id, title: string, label: string) => Promise<Todo>
  delete: (id: Id) => Promise<void>
}
