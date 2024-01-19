import { css } from '@emotion/react'
import { FC } from 'react'
import { DI } from '../../../di/ioc.ts'
import { Button } from '../../components/atoms/Button/Button.tsx'
import { Input } from '../../components/atoms/Input/Input.tsx'
import { TextArea } from '../../components/atoms/TextArea/TextArea.tsx'
import { Page } from '../../components/molecules/Page/Page.tsx'
import { flex1 } from '../../styles'

export const CreateTodo: FC = () => {
  const { setTitle, setDescription, createTodo } = DI.resolve('createTodoViewModel')

  return (
    <Page
      headline="Create TODO"
      footer={<Button customStyles={styles.button} label="Create" onClick={createTodo} />}>
      <Input label="Title" onChange={setTitle} />
      <TextArea customStyles={flex1} label="Description" onChange={setDescription} />
    </Page>
  )
}

const styles = {
  button: css({ width: '100%' }),
}
