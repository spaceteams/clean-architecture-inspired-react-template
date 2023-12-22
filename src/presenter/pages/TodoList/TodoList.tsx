import { css } from '@emotion/react'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { DI } from '../../../di/ioc.ts'
import { Button } from '../../components/atoms/Button/Button.tsx'
import { DeleteTodoDialog } from '../../components/molecules/DeleteTodoDialog/DeleteTodoDialog.tsx'
import { List } from '../../components/molecules/List/List.tsx'
import { Page } from '../../components/molecules/Page/Page.tsx'

export const TodoList: FC = () => {
  const navigate = useNavigate()

  const { todos, deleteTodo, showDeleteDialog, closeDeleteDialog, todoToDelete } = DI.resolve('todoListViewModel')

  return (
    <>
      <Page
        headline="TODOs"
        footer={<Button customStyles={styles.button} label="+" onClick={() => navigate('/todo/create')} />}>
        <List
          items={todos}
          onItemClick={todo => navigate(`/todo/detail/${todo.id}`)}
          onItemDelete={showDeleteDialog} />
      </Page>

      {todoToDelete !== undefined && (
        <DeleteTodoDialog
          open={true}
          todoName={todoToDelete.title}
          onConfirm={deleteTodo}
          onCancel={closeDeleteDialog} />
      )}
    </>
  )
}

const styles = {
  button: css({ width: '100%' }),
}
