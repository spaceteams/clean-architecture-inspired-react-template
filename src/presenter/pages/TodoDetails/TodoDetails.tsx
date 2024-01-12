import { css } from '@emotion/react'
import { FC } from 'react'
import { DI } from '../../../di/ioc.ts'
import { Button } from '../../components/atoms/Button/Button.tsx'
import { Input } from '../../components/atoms/Input/Input.tsx'
import { Content } from '../../components/atoms/PageContent/Content.tsx'
import { TextArea } from '../../components/atoms/TextArea/TextArea.tsx'
import { Page } from '../../components/molecules/Page/Page.tsx'

export const TodoDetails: FC = () => {
  const { title, setTitle, description, setDescription, updateTodo, deleteTodo } = DI.resolve('todoDetailsViewModel')

  return (
    <Page headline="TODO Details">
      <Input label="Title" value={title} onChange={setTitle} />

      <TextArea
        customStyles={styles.description}
        label="Description"
        value={description}
        onChange={setDescription} />

      <Content customStyles={styles.buttons} direction="row">
        <Button customStyles={styles.button} label="Delete" onClick={deleteTodo} />
        <Button customStyles={styles.button} label="Edit" onClick={updateTodo} />
      </Content>
    </Page>
  )
}

const styles = {
  description: css({ flex: '1 1 auto' }),
  buttons: css({ flex: '0 0' }),
  button: css({ flexBasis: '50%' }),
}
