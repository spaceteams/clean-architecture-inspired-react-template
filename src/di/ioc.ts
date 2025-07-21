import { asFunction, createContainer } from 'awilix'
import { todoRepository } from '../adapter/repository/todoRepository.ts'
import { createTodoUseCase } from '../domain/useCases/todo/createTodoUseCase.ts'
import { deleteTodoUseCase } from '../domain/useCases/todo/deleteTodoUseCase.ts'
import { getTodosUseCase } from '../domain/useCases/todo/getTodosUseCase.ts'
import { getTodoUseCase } from '../domain/useCases/todo/getTodoUseCase.ts'
import { updateTodoUseCase } from '../domain/useCases/todo/updateTodoUseCase.ts'
import { createTodoViewModel } from '../presenter/pages/CreateTodo/createTodoViewModel.ts'
import { todoDetailsViewModel } from '../presenter/pages/TodoDetails/todoDetailsViewModel.ts'
import { todoListViewModel } from '../presenter/pages/TodoList/todoListViewModel.ts'

const container = createContainer()

container.register({
  todoRepository: asFunction(todoRepository),
  todoListViewModel: asFunction(todoListViewModel),
  createTodoViewModel: asFunction(createTodoViewModel),
  todoDetailsViewModel: asFunction(todoDetailsViewModel),
  getTodosUseCase: asFunction(getTodosUseCase),
  deleteTodoUseCase: asFunction(deleteTodoUseCase),
  createTodoUseCase: asFunction(createTodoUseCase),
  getTodoUseCase: asFunction(getTodoUseCase),
  updateTodoUseCase: asFunction(updateTodoUseCase),
})

export const DI = container
