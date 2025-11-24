import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, describe, it, vi } from 'vitest'
import { Input } from './Input.tsx'

describe('Input', () => {
  it('should display the provided label', () => {
    // given / when
    render(<Input label="Username" onChange={vi.fn()} />)

    // then
    expect(screen.getByText('Username:')).toBeInTheDocument()
  })

  it('should display the current value when provided', () => {
    // given / when
    render(<Input label="Email" onChange={vi.fn()} value="user@example.com" />)

    // then
    expect(screen.getByDisplayValue('user@example.com')).toBeInTheDocument()
  })

  it.each([
    ['single character', 'a'],
    ['multiple words', 'hello world'],
    ['special characters', 'user@domain.com'],
    ['numbers and text', 'user123'],
  ])('should notify parent component when user types %s', async (_, inputValue) => {
    const user = userEvent.setup()
    const onChangeSpy = vi.fn()

    // given
    render(<Input label="Test" onChange={onChangeSpy} />)

    // when
    await user.type(screen.getByRole('textbox'), inputValue)

    // then
    expect(onChangeSpy).toHaveBeenLastCalledWith(inputValue)
  })

  it('should allow clearing the input value', async () => {
    const user = userEvent.setup()
    const onChangeSpy = vi.fn()

    // given
    render(<Input label="Test" value="initial value" onChange={onChangeSpy} />)

    // when
    await user.clear(screen.getByRole('textbox'))

    // then
    expect(onChangeSpy).toHaveBeenLastCalledWith('')
  })
})
