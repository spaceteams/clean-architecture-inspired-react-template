import { css } from '@emotion/react'
import { FC } from 'react'
import { DI } from '../../../di/ioc.ts'
import { Button } from '../../components/atoms/Button/Button.tsx'
import { Input } from '../../components/atoms/Input/Input.tsx'
import { TextArea } from '../../components/atoms/TextArea/TextArea.tsx'
import { Page } from '../../components/molecules/Page/Page.tsx'

export const CreateTodo: FC = () => {
  const { setTitle, setDescription, createTodo } = DI.resolve('createTodoViewModel')

  return (
    <Page headline="Create TODO">
      <Input label="Title" onChange={setTitle} />
      <TextArea customStyles={styles.description} label="Description" onChange={setDescription} />
      <Button label="Create" onClick={createTodo} />
    </Page>
  )
}

const styles = {
  description: css({ flex: '1 1 auto' }),
}
