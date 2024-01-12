import { css } from '@emotion/react'
import { FC } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CreateTodo } from './presenter/pages/CreateTodo/CreateTodo.tsx'
import { TodoDetails } from './presenter/pages/TodoDetails/TodoDetails.tsx'
import { TodoList } from './presenter/pages/TodoList/TodoList.tsx'

export const App: FC = () => (
  <BrowserRouter>
    <div css={styles.pageWrapper}>
      <Routes>
        <Route path="/" element={<TodoList />} />
        <Route path="/todo/create" element={<CreateTodo />} />
        <Route path="/todo/detail/:id" element={<TodoDetails />} />
      </Routes>

    </div>
  </BrowserRouter>
)

const styles = {
  pageWrapper: css({
    width: '100%',
    height: '100%',
    padding: '4em',
    boxSizing: 'border-box',
  }),
}
