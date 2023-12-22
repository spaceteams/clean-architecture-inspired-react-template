import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import { Header } from './Header.tsx'

test('should render component', () => {
  // given / when
  render(<Header title="" />)

  // then
  expect(screen.getByRole('heading')).toBeInTheDocument()
})

test('should render title', () => {
  // given / when
  render(<Header title="test-title" />)

  // then
  expect(screen.getByText('test-title')).toBeInTheDocument()
})
