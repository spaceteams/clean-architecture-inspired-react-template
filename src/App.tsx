import { FC } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { CreateTodo } from './presenter/pages/CreateTodo/CreateTodo.tsx'
import { TodoDetails } from './presenter/pages/TodoDetails/TodoDetails.tsx'
import { TodoList } from './presenter/pages/TodoList/TodoList.tsx'

export const App: FC = () => (
  <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path="/" element={<TodoList />} />
        <Route path="/todo/create" element={<CreateTodo />} />
        <Route path="/todo/detail/:id" element={<TodoDetails />} />
      </Routes>

    </div>
  </BrowserRouter>
)
