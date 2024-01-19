import { FC } from 'react'
import { Todo } from '../../../../domain/model/Todo.ts'
import { Content } from '../../atoms/Content/Content.tsx'
import { ListItem } from '../../atoms/ListItem/ListItem.tsx'

type ListProps = {
  readonly items: Todo[]
  readonly onItemClick: (item: Todo) => void
  readonly onItemDelete: (item: Todo) => void
}

export const List: FC<ListProps> = ({ items, onItemClick, onItemDelete }) => (
  <Content>
    {items.map(item => (
      <ListItem
        key={item.id}
        title={item.title}
        onClick={() => onItemClick(item)}
        onDelete={() => onItemDelete(item)} />
    ))}
  </Content>
)
