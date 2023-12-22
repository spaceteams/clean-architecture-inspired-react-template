import { FC } from 'react'
import { Todo } from '../../../../domain/model/Todo.ts'
import { ListItem } from '../../atoms/ListItem/ListItem.tsx'

type Props = {
  readonly items: Todo[]
  readonly onItemClick: (item: Todo) => void
  readonly onItemDelete: (item: Todo) => void
}

export const List: FC<Props> = ({ items, onItemClick, onItemDelete }) => (
  <div style={{ display: 'flex', flexDirection: 'column', rowGap: '0.25rem' }}>
    {items.map(item => (
      <ListItem
        key={item.id}
        title={item.title}
        onClick={() => onItemClick(item)}
        onDelete={() => onItemDelete(item)} />
    ))}
  </div>
)
