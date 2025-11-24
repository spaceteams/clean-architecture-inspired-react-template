import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ReactNode } from 'react'
import { Page } from './Page.tsx'

describe('Page Component', () => {
  it('should display the provided headline to users', () => {
    // given
    const headline = 'Welcome to Our Application'

    // when
    render(<Page headline={headline} />)

    // then
    expect(screen.getByRole('heading', { name: headline })).toBeInTheDocument()
  })

  it('should render child content within the page layout', () => {
    // given
    const testContent = 'Important business content'

    // when
    render(
      <Page headline="Test">
        <div>
          {testContent}
        </div>
      </Page>,
    )

    // then
    expect(screen.getByText(testContent)).toBeInTheDocument()
  })

  it.each([
    [<button>Action</button>, true],
    [undefined, false],
  ])('should conditionally display footer based on footer prop', (
    footerContent: ReactNode,
    shouldShowFooter: boolean,
  ) => {
    // given / when
    render(<Page headline="Test" footer={footerContent} />)

    // then
    if (shouldShowFooter) {
      expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument()
    } else {
      expect(screen.queryByTestId('footer')).not.toBeInTheDocument()
    }
  })
})
