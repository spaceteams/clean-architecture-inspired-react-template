import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { DI } from '../../../di/ioc.ts'
import { Button } from '../../components/atoms/Button/Button.tsx'
import { List } from '../../components/molecules/List/List.tsx'
import { Page } from '../../components/molecules/Page/Page.tsx'

export const TodoList: FC = () => {
  const navigate = useNavigate()

  const { todos, deleteItem } = DI.resolve('todoListViewModel')

  return (
    <Page headline="TODOs">
      <List
        items={todos}
        onItemClick={todo => navigate(`/todo/detail/${todo.id}`)}
        onItemDelete={todo => deleteItem(todo.id)} />

      <Button label="+" onClick={() => navigate('/todo/create')} />
    </Page>
  )
}
