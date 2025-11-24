import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Header } from './Header.tsx'

describe('Header', () => {
  it.each([
    ['Todo List'],
    ['My Tasks'],
    ['Welcome Back!'],
    ['Special Characters: @#$%'],
  ])('should display the provided title "%s"', (title) => {
    // given / when
    render(<Header title={title} />)

    // then
    expect(screen.getByText(title)).toBeInTheDocument()
  })

  it('should render header element when title is empty', () => {
    // given / when
    render(<Header title="" />)

    // then
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent('')
  })
})
