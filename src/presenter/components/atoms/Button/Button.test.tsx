import { css } from '@emotion/react'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import { test, expect, vi } from 'vitest'
import { Button } from './Button.tsx'

test('should render button', () => {
  // given / when
  render(<Button label="" onClick={vi.fn()} />)

  // then
  expect(screen.getByRole('button')).toBeInTheDocument()
})

test('should render label', () => {
  // given / when
  render(<Button label="test-label" onClick={vi.fn()} />)

  // then
  expect(screen.getByText('test-label')).toBeInTheDocument()
})

test('should call onClick if button is clicked', async () => {
  const user = userEvent.setup()

  // given
  const onClick = vi.fn()
  render(<Button label="" onClick={onClick} />)

  // when
  await user.click(screen.getByRole('button'))

  // then
  expect(onClick).toHaveBeenCalled()
})

test('should apply custom styles', () => {
  // given / when
  const customStyles = css({ color: 'green' })
  render(<Button label="" onClick={vi.fn()} customStyles={customStyles} />)

  // then
  expect(screen.getByRole('button')).toHaveStyle({ color: 'rgb(0, 128, 0)' })
})

test('should apply multiple custom styles', () => {
  // given / when
  const customStyles = [css({ color: 'green' }), css({ backgroundColor: 'red' })]
  render(<Button label="" onClick={vi.fn()} customStyles={customStyles} />)

  // then
  expect(screen.getByRole('button')).toHaveStyle({ color: 'rgb(0, 128, 0)', backgroundColor: 'rgb(255, 0, 0)' })
})
