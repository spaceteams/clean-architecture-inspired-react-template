import { css } from '@emotion/react'
import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import { Content } from './Content.tsx'

test('should render component', () => {
  // given / when
  render(<Content />)

  // then
  expect(screen.getByTestId('content')).toBeInTheDocument()
})

test('should render children', () => {
  // given / when
  const content = <div>child</div>
  render(
    <Content>
      {content}
    </Content>,
  )

  // then
  expect(screen.getByText('child')).toBeInTheDocument()
})

test('should use column as default flex direction', () => {
  // given / when
  render(<Content />)

  // then
  expect(screen.getByTestId('content')).toHaveStyle({ flexDirection: 'column' })
})

test('should respect custom flex direction', () => {
  // given / when
  render(<Content direction="row" />)

  // then
  expect(screen.getByTestId('content')).toHaveStyle({ flexDirection: 'row' })
})

test('should apply custom styles', () => {
  // given / when
  const customStyles = css({ color: 'green' })
  render(<Content customStyles={customStyles} />)

  // then
  expect(screen.getByTestId('content')).toHaveStyle({ color: 'rgb(0, 128, 0)' })
})
