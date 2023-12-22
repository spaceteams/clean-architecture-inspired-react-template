import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import { Footer } from './Footer.tsx'

test('should render component', () => {
  // given / when
  render(<Footer />)

  // then
  expect(screen.getByTestId('footer')).toBeInTheDocument()
})

test('should render children', () => {
  // given / when
  const content = <div>child</div>
  render(
    <Footer>
      {content}
    </Footer>,
  )

  // then
  expect(screen.getByText('child')).toBeInTheDocument()
})
