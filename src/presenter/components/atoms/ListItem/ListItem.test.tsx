import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'
import { ListItem } from './ListItem.tsx'

test('should display the provided title', () => {
  // given / when
  render(<ListItem title="My Todo Item" onClick={vi.fn()} onDelete={vi.fn()} />)

  // then
  expect(screen.getByText('My Todo Item')).toBeInTheDocument()
})

test('should trigger item selection when clicked', async () => {
  const user = userEvent.setup()
  const onItemSelect = vi.fn()

  // given
  render(<ListItem title="Todo Item" onClick={onItemSelect} onDelete={vi.fn()} />)

  // when
  await user.click(screen.getByTestId('list-item'))

  // then
  expect(onItemSelect).toHaveBeenCalledOnce()
})

test('should trigger deletion when delete button is clicked', async () => {
  const user = userEvent.setup()
  const onItemDelete = vi.fn()

  // given
  const { container } = render(<ListItem title="Todo Item" onClick={vi.fn()} onDelete={onItemDelete} />)

  // when
  await user.click(container.querySelector('svg')!)

  // then
  expect(onItemDelete).toHaveBeenCalledOnce()
})

test('should prevent item selection when delete button is clicked', async () => {
  const user = userEvent.setup()
  const onItemSelect = vi.fn()

  // given
  const { container } = render(<ListItem title="Todo Item" onClick={onItemSelect} onDelete={vi.fn()} />)

  // when
  await user.click(container.querySelector('svg')!)

  // then
  expect(onItemSelect).not.toHaveBeenCalled()
})
