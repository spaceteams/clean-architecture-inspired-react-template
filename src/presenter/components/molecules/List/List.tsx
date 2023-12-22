import { ReactNode } from 'react'
import { Id } from '../../../../domain/model/types'
import { Content } from '../../atoms/Content/Content.tsx'
import { ListItem } from '../../atoms/ListItem/ListItem.tsx'

type Item = {
  readonly id: Id
  readonly title: string
}

type ListProps<T extends Item> = {
  readonly items: T[]
  readonly onItemClick: (item: T) => void
  readonly onItemDelete: (item: T) => void
}

export const List = <T extends Item>({ items, onItemClick, onItemDelete }: ListProps<T>): ReactNode => (
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
