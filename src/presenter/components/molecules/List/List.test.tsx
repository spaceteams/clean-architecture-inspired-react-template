import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'
import { List } from './List.tsx'

const items = [
  { id: '1', title: 'Item 1' },
  { id: '2', title: 'Item 2' },
  { id: '3', title: 'Item 3' },
]

test('should render list items and warp them in a content component', () => {
  // given / when
  render(<List items={items} onItemClick={vi.fn()} onItemDelete={vi.fn()} />)

  // then
  const listItems = screen.getAllByTestId('list-item')
  expect(listItems).toHaveLength(3)
  expect(listItems[0].parentElement?.dataset.testid).toEqual('content')
})

test('should call onItemClick and pass item if item is clicked', async () => {
  const user = userEvent.setup()

  // given
  const onItemClick = vi.fn()
  render(<List items={items} onItemClick={onItemClick} onItemDelete={vi.fn()} />)

  // when
  await user.click(screen.getAllByTestId('list-item')[0])

  // then
  expect(onItemClick).toHaveBeenCalledWith(items[0])
})

test('should call onItemDelete and pass item if an item is deleted', async () => {
  const user = userEvent.setup()

  // given
  const onItemDelete = vi.fn()
  render(<List items={items} onItemClick={vi.fn()} onItemDelete={onItemDelete} />)

  // when
  await user.click(screen.getAllByTestId('list-item')[0].querySelector('svg')!)

  // then
  expect(onItemDelete).toHaveBeenCalledWith(items[0])
})

test('should not call onItemClick if an item is deleted', async () => {
  const user = userEvent.setup()

  // given
  const onItemClick = vi.fn()
  render(<List items={items} onItemClick={onItemClick} onItemDelete={vi.fn()} />)

  // when
  await user.click(screen.getAllByTestId('list-item')[0].querySelector('svg')!)

  // then
  expect(onItemClick).not.toHaveBeenCalled()
})
