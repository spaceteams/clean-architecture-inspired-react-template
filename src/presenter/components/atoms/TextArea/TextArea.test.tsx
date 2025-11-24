import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'
import { TextArea } from './TextArea.tsx'

test('should display provided label to user', () => {
  // given / when
  render(<TextArea label="Description" onChange={vi.fn()} />)

  // then
  expect(screen.getByText('Description:')).toBeInTheDocument()
})

test('should display current value when provided', () => {
  // given / when
  render(<TextArea label="Description" onChange={vi.fn()} value="Current content" />)

  // then
  expect(screen.getByDisplayValue('Current content')).toBeInTheDocument()
})

test('should notify parent when user enters text', async () => {
  const user = userEvent.setup()
  const onChangeSpy = vi.fn()

  // given
  render(<TextArea label="Description" onChange={onChangeSpy} />)

  // when
  await user.type(screen.getByRole('textbox'), 'Hello')

  // then
  expect(onChangeSpy).toHaveBeenLastCalledWith('Hello')
})

test('should notify parent with each character typed', async () => {
  const user = userEvent.setup()
  const onChangeSpy = vi.fn()

  // given
  render(<TextArea label="Description" onChange={onChangeSpy} />)

  // when
  await user.type(screen.getByRole('textbox'), 'ABC')

  // then
  expect(onChangeSpy).toHaveBeenCalledTimes(3)
  expect(onChangeSpy).toHaveBeenNthCalledWith(1, 'A')
  expect(onChangeSpy).toHaveBeenNthCalledWith(2, 'AB')
  expect(onChangeSpy).toHaveBeenNthCalledWith(3, 'ABC')
})
