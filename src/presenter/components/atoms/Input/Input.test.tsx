import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'
import { Input } from './Input.tsx'

test('should render label and input', () => {
  // given / when
  render(<Input label="" onChange={vi.fn()} />)

  // then
  expect(screen.getByRole('heading')).toBeInTheDocument()
  expect(screen.getByRole('textbox')).toBeInTheDocument()
})

test('should render label with colon', () => {
  // given / when
  render(<Input label="test-label" onChange={vi.fn()} />)

  // then
  expect(screen.getByText('test-label:')).toBeInTheDocument()
})

test("should set input's value", () => {
  // given / when
  render(<Input label="" onChange={vi.fn()} value="test-value" />)

  // then
  expect(screen.getByRole<HTMLInputElement>('textbox').value).toEqual('test-value')
})

test('should call onChange with expected value', async () => {
  const user = userEvent.setup()

  // given
  const onChange = vi.fn()
  render(<Input label="" onChange={onChange} />)

  // when
  await user.type(screen.getByRole('textbox'), 'test-value')

  // then
  expect(onChange).toHaveBeenCalledTimes(10)
  expect(onChange).toHaveBeenCalledWith('test-value')
})
