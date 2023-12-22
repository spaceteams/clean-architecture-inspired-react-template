import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'
import { ListItem } from './ListItem.tsx'

test('should render component', () => {
  // given / when
  render(<ListItem title="" onClick={vi.fn()} onDelete={vi.fn()} />)

  // then
  expect(screen.getByTestId('list-item')).toBeInTheDocument()
})

test('should render title and trash icon', () => {
  // given / when
  const { container } = render(<ListItem title="test-title" onClick={vi.fn()} onDelete={vi.fn()} />)

  // then
  expect(screen.getByText('test-title')).toBeInTheDocument()
  expect(container.querySelector('svg')).toBeInTheDocument()
})

test('should call onClick if the list item is clicked', async () => {
  const user = userEvent.setup()

  // given
  const onClick = vi.fn()
  render(<ListItem title="" onClick={onClick} onDelete={vi.fn()} />)

  // when
  await user.click(screen.getByTestId('list-item'))

  // then
  expect(onClick).toHaveBeenCalled()
})

test('should call onClick if the title is clicked', async () => {
  const user = userEvent.setup()

  // given
  const onClick = vi.fn()
  render(<ListItem title="test-title" onClick={onClick} onDelete={vi.fn()} />)

  // when
  await user.click(screen.getByText('test-title'))

  // then
  expect(onClick).toHaveBeenCalled()
})

test('should call onDelete if the trash icon is clicked', async () => {
  const user = userEvent.setup()

  // given
  const onDelete = vi.fn()
  const { container } = render(<ListItem title="" onClick={vi.fn()} onDelete={onDelete} />)

  // when
  await user.click(container.querySelector('svg')!)

  // then
  expect(onDelete).toHaveBeenCalled()
})

test('should not call onClick if the trash icon is clicked', async () => {
  const user = userEvent.setup()

  // given
  const onClick = vi.fn()
  const { container } = render(<ListItem title="" onClick={onClick} onDelete={vi.fn()} />)

  // when
  await user.click(container.querySelector('svg')!)

  // then
  expect(onClick).not.toHaveBeenCalled()
})
