import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import { Footer } from './Footer.tsx'

test('should render children content', () => {
  // given
  const childContent = 'Footer content'

  // when
  render(
    <Footer>
      <span>
        {childContent}
      </span>
    </Footer>,
  )

  // then
  expect(screen.getByText(childContent)).toBeInTheDocument()
})
