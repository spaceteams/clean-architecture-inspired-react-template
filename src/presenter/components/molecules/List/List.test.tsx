import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { List } from './List.tsx'

const mockItems = [
  { id: '1', title: 'Item 1' },
  { id: '2', title: 'Item 2' },
  { id: '3', title: 'Item 3' },
]

describe('List', () => {
  it('should render all provided items', () => {
    // given / when
    render(<List items={mockItems} onItemClick={vi.fn()} onItemDelete={vi.fn()} />)

    // then
    const listItems = screen.getAllByTestId('list-item')
    expect(listItems).toHaveLength(mockItems.length)
  })

  it('should notify when an item is selected', async () => {
    const user = userEvent.setup()
    const onItemClick = vi.fn()

    // given
    render(<List items={mockItems} onItemClick={onItemClick} onItemDelete={vi.fn()} />)

    // when
    await user.click(screen.getAllByTestId('list-item')[0])

    // then
    expect(onItemClick).toHaveBeenCalledWith(mockItems[0])
  })

  it('should notify when an item is deleted', async () => {
    const user = userEvent.setup()
    const onItemDelete = vi.fn()

    // given
    render(<List items={mockItems} onItemClick={vi.fn()} onItemDelete={onItemDelete} />)

    // when
    await user.click(screen.getAllByTestId('list-item')[0].querySelector('svg')!)

    // then
    expect(onItemDelete).toHaveBeenCalledWith(mockItems[0])
  })

  it('should prevent item selection when delete action is triggered', async () => {
    const user = userEvent.setup()
    const onItemClick = vi.fn()

    // given
    render(<List items={mockItems} onItemClick={onItemClick} onItemDelete={vi.fn()} />)

    // when
    await user.click(screen.getAllByTestId('list-item')[0].querySelector('svg')!)

    // then
    expect(onItemClick).not.toHaveBeenCalled()
  })

  it('should handle empty list gracefully', () => {
    // given / when
    render(<List items={[]} onItemClick={vi.fn()} onItemDelete={vi.fn()} />)

    // then
    const listItems = screen.queryAllByTestId('list-item')
    expect(listItems).toHaveLength(0)
  })
})
