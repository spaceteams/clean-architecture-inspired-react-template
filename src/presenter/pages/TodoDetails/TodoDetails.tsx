import { FC } from 'react'
import { DI } from '../../../di/ioc.ts'
import { Button } from '../../components/atoms/Button/Button.tsx'
import { Header } from '../../components/atoms/Header/Header.tsx'
import { Input } from '../../components/atoms/Input/Input.tsx'
import { TextArea } from '../../components/atoms/TextArea/TextArea.tsx'

export const TodoDetails: FC = () => {
  const { title, setTitle, description, setDescription, updateTodo, deleteTodo } = DI.resolve('todoDetailsViewModel')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', rowGap: '1rem' }}>
      <Header title="Details" />
      <Input label="Title" value={title} onChange={setTitle} />
      <TextArea label="Description" value={description} onChange={setDescription} />

      <div style={{ display: 'flex', flexDirection: 'row', columnGap: '0.5rem' }}>
        <Button style={{ flexBasis: '50%' }} label="Delete" onClick={deleteTodo} />
        <Button style={{ flexBasis: '50%' }} label="Edit" onClick={updateTodo} />
      </div>
    </div>
  )
}
