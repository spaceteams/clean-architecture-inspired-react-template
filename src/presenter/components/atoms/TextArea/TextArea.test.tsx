import { css } from '@emotion/react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'
import { TextArea } from './TextArea.tsx'

test('should render label and textarea', () => {
  // given / when
  render(<TextArea label="" onChange={vi.fn()} />)

  // then
  expect(screen.getByRole('heading')).toBeInTheDocument()
  expect(screen.getByRole('textbox')).toBeInTheDocument()
})

test('should render label with colon', () => {
  // given / when
  render(<TextArea label="test-label" onChange={vi.fn()} />)

  // then
  expect(screen.getByText('test-label:')).toBeInTheDocument()
})

test("should set textarea's value", () => {
  // given / when
  render(<TextArea label="" onChange={vi.fn()} value="test-value" />)

  // then
  expect(screen.getByRole<HTMLInputElement>('textbox').value).toEqual('test-value')
})

test('should call onChange with expected value', async () => {
  const user = userEvent.setup()

  // given
  const onChange = vi.fn()
  render(<TextArea label="" onChange={onChange} />)

  // when
  await user.type(screen.getByRole('textbox'), 'test-value')

  // then
  expect(onChange).toHaveBeenCalledTimes(10)
  expect(onChange).toHaveBeenCalledWith('test-value')
})

test('should apply custom styles', () => {
  // given / when
  const customStyles = css({ color: 'green' })
  render(<TextArea label="" onChange={vi.fn()} customStyles={customStyles} />)

  // then
  expect(screen.getByRole('textbox').parentElement).toHaveStyle({ color: 'rgb(0, 128, 0)' })
})
