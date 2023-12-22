import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import { Page } from './Page.tsx'

test('should render component', () => {
  // given / when
  render(<Page headline="" />)

  // then
  expect(screen.getByTestId('page')).toBeInTheDocument()
})

test('should render header', () => {
  // given / when
  render(<Page headline="headline-test" />)

  // then
  expect(screen.getByRole('heading', { name: 'headline-test' })).toBeInTheDocument()
})

test('should render content', () => {
  // given / when
  render(
    <Page headline="">
      <div>child</div>
    </Page>,
  )

  // then
  const content = screen.getByTestId('content')
  expect(content).toBeInTheDocument()
  expect(content.firstElementChild?.textContent).toEqual('child')
})

test('should not render footer if no footer is passed', () => {
  // given / when
  render(<Page headline="" />)

  // then
  expect(screen.queryByTestId('footer')).not.toBeInTheDocument()
})

test('should render footer', () => {
  // given / when
  render(<Page headline="" footer={<div>child</div>} />)

  // then
  const footer = screen.getByTestId('footer')
  expect(footer).toBeInTheDocument()
  expect(footer.firstElementChild?.textContent).toEqual('child')
})
