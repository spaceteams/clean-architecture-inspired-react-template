import { FC } from 'react'
import { Dialog } from '../Dialog/Dialog.tsx'

type DialogProps = {
  open: boolean
  todoName: string
  onConfirm: () => void
  onCancel: () => void
}

export const DeleteTodoDialog: FC<DialogProps> = ({ open, todoName, onConfirm, onCancel }) => (
  <Dialog
    open={open}
    title="Delete TODO?"
    description={`The TODO "${todoName}" will be removed permanently. Do you want to proceed?`}
    onConfirm={onConfirm}
    onClose={onCancel} />
)
