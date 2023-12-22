import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'
import { Overlay } from './Overlay.tsx'

test('should render component', () => {
  // given / when
  render(<Overlay />)

  // then
  expect(screen.getByTestId('overlay')).toBeInTheDocument()
})

test('should render children', () => {
  // given / when
  const content = <div>child</div>
  render(
    <Overlay>
      {content}
    </Overlay>,
  )

  // then
  expect(screen.getByText('child')).toBeInTheDocument()
})

test('should call onClick if the overlay is clicked', async () => {
  const user = userEvent.setup()

  // given
  const onClick = vi.fn()
  render(<Overlay onClick={onClick} />)

  // when
  await user.click(screen.getByTestId('overlay'))

  // then
  expect(onClick).toHaveBeenCalled()
})

test('should call onClick if a child is clicked', async () => {
  const user = userEvent.setup()

  // given
  const onClick = vi.fn()
  const content = <div>child</div>
  render(
    <Overlay onClick={onClick}>
      {content}
    </Overlay>,
  )

  // when
  await user.click(screen.getByText('child'))

  // then
  expect(onClick).toHaveBeenCalled()
})
