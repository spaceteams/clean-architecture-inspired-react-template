import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { DI } from '../../../di/ioc.ts'
import { Button } from '../../components/atoms/Button/Button.tsx'
import { Header } from '../../components/atoms/Header/Header.tsx'
import { List } from '../../components/molecules/List/List.tsx'

export const TodoList: FC = () => {
  const navigate = useNavigate()

  const { todos, deleteItem } = DI.resolve('todoListViewModel')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', rowGap: '1rem' }}>
      <Header title="TODOs" />

      <List
        items={todos}
        onItemClick={todo => navigate(`/todo/detail/${todo.id}`)}
        onItemDelete={todo => deleteItem(todo.id)} />

      <Button label="+" onClick={() => navigate('/todo/create')} />
    </div>
  )
}
