import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'
import { Overlay } from './Overlay.tsx'

test('should display overlay content to the user', () => {
  // given / when
  const content = <div>Modal Content</div>
  render(
    <Overlay>
      {content}
    </Overlay>,
  )

  // then
  expect(screen.getByText('Modal Content')).toBeInTheDocument()
})

test('should trigger close action when overlay background is clicked', async () => {
  const user = userEvent.setup()

  // given
  const onCloseSpy = vi.fn()
  render(<Overlay onClick={onCloseSpy} />)

  // when
  await user.click(screen.getByTestId('overlay'))

  // then
  expect(onCloseSpy).toHaveBeenCalledOnce()
})

test('should trigger close action when clicking anywhere within overlay area', async () => {
  const user = userEvent.setup()

  // given
  const onCloseSpy = vi.fn()
  const content = <div>Modal Content</div>
  render(
    <Overlay onClick={onCloseSpy}>
      {content}
    </Overlay>,
  )

  // when
  await user.click(screen.getByText('Modal Content'))

  // then
  expect(onCloseSpy).toHaveBeenCalledOnce()
})

test('should not trigger any action when no click handler is provided', async () => {
  const user = userEvent.setup()

  // given
  render(<Overlay />)

  // when / then - should not throw error
  await user.click(screen.getByTestId('overlay'))
  // If we reach this point, no error was thrown
  expect(screen.getByTestId('overlay')).toBeInTheDocument()
})
