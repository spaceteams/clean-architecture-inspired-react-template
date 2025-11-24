import { css } from '@emotion/react'
import { render, screen } from '@testing-library/react'
import { Property } from 'csstype'
import { describe, expect, it } from 'vitest'
import { Content } from './Content.tsx'

describe('Content', () => {
  it('should render component', () => {
    // given / when
    render(<Content />)

    // then
    expect(screen.getByTestId('content')).toBeInTheDocument()
  })

  it('should display provided child content', () => {
    // given / when
    const childContent = <div>child</div>
    render(
      <Content>
        {childContent}
      </Content>,
    )

    // then
    expect(screen.getByText('child')).toBeInTheDocument()
  })

  describe('flex direction behavior', () => {
    it('should default to column layout when no direction is specified', () => {
      // given / when
      render(<Content />)

      // then
      expect(screen.getByTestId('content')).toHaveStyle({ flexDirection: 'column' })
    })

    it.each([
      ['row'],
      ['column'],
      ['row-reverse'],
      ['column-reverse'],
    ])('should apply %s flex direction when specified', (direction) => {
      // given / when
      render(<Content direction={direction as Property.FlexDirection} />)

      // then
      expect(screen.getByTestId('content')).toHaveStyle({ flexDirection: direction })
    })
  })

  it('should apply custom styling when provided', () => {
    // given
    const customStyles = css({ color: 'green' })

    // when
    render(<Content customStyles={customStyles} />)

    // then
    expect(screen.getByTestId('content')).toHaveStyle({ color: 'rgb(0, 128, 0)' })
  })
})
