import { FC } from 'react'
import { DI } from '../../../di/ioc.ts'
import { Button } from '../../components/atoms/Button/Button.tsx'
import { Header } from '../../components/atoms/Header/Header.tsx'
import { Input } from '../../components/atoms/Input/Input.tsx'
import { TextArea } from '../../components/atoms/TextArea/TextArea.tsx'

export const CreateTodo: FC = () => {
  const { setTitle, setDescription, createTodo } = DI.resolve('createTodoViewModel')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', rowGap: '1rem' }}>
      <Header title="Add TODO" />
      <Input label="Title" onChange={setTitle} />
      <TextArea label="Description" onChange={setDescription} />
      <Button label="Create" onClick={createTodo} />
    </div>
  )
}
