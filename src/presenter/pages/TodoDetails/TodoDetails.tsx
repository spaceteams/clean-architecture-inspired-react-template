import { css } from '@emotion/react'
import { FC } from 'react'
import { DI } from '../../../di/ioc.ts'
import { Button } from '../../components/atoms/Button/Button.tsx'
import { Input } from '../../components/atoms/Input/Input.tsx'
import { Content } from '../../components/atoms/Content/Content.tsx'
import { TextArea } from '../../components/atoms/TextArea/TextArea.tsx'
import { DeleteTodoDialog } from '../../components/molecules/DeleteTodoDialog/DeleteTodoDialog.tsx'
import { Page } from '../../components/molecules/Page/Page.tsx'
import { color, flex0, flex1 } from '../../styles'

export const TodoDetails: FC = () => {
  const {
    title,
    setTitle,
    description,
    setDescription,
    updateTodo,
    deleteTodo,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
  } = DI.resolve('todoDetailsViewModel')

  return (
    <>
      <Page
        headline="TODO Details"
        footer={(
          <Content customStyles={styles.buttonGroup} direction="row">
            <Button
              customStyles={[styles.button, styles.deleteButton]}
              label="Delete"
              onClick={() => setIsDeleteDialogOpen(true)} />

            <Button customStyles={styles.button} label="Edit" onClick={updateTodo} />
          </Content>
        )}>
        <Input label="Title" value={title} onChange={setTitle} />

        <TextArea
          customStyles={styles.description}
          label="Description"
          value={description}
          onChange={setDescription} />
      </Page>

      {isDeleteDialogOpen && (
        <DeleteTodoDialog
          open={true}
          todoName={title}
          onConfirm={deleteTodo}
          onCancel={() => setIsDeleteDialogOpen(false)} />
      )}
    </>
  )
}

const styles = {
  description: flex1,
  buttonGroup: flex0,
  button: css({ flexBasis: '50%' }),
  deleteButton: css({
    backgroundColor: color.backgroundRed,
    '&:hover': {
      backgroundColor: color.backgroundRedLight,
    },
  }),
}
