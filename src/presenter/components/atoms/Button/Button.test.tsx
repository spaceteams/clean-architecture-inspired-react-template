import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Button } from './Button.tsx'

describe('Button', () => {
  it('should be accessible as a button element', () => {
    // given / when
    render(<Button label="Test Button" onClick={vi.fn()} />)

    // then
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it.each([
    ['Save'],
    ['Cancel'],
    ['Submit Form'],
    ['Delete Item'],
    [''],
  ])('should display the provided label: "%s"', (label) => {
    // given / when
    render(<Button label={label} onClick={vi.fn()} />)

    // then
    if (label) {
      expect(screen.getByText(label)).toBeInTheDocument()
    } else {
      expect(screen.getByRole('button')).toHaveTextContent('')
    }
  })

  it('should execute the click handler when activated', async () => {
    const user = userEvent.setup()
    const clickHandler = vi.fn()

    // given
    render(<Button label="Click Me" onClick={clickHandler} />)

    // when
    await user.click(screen.getByRole('button'))

    // then
    expect(clickHandler).toHaveBeenCalledOnce()
  })

  it('should execute click handler multiple times for multiple clicks', async () => {
    const user = userEvent.setup()
    const clickHandler = vi.fn()

    // given
    render(<Button label="Click Me" onClick={clickHandler} />)

    // when
    await user.click(screen.getByRole('button'))
    await user.click(screen.getByRole('button'))
    await user.click(screen.getByRole('button'))

    // then
    expect(clickHandler).toHaveBeenCalledTimes(3)
  })
})
