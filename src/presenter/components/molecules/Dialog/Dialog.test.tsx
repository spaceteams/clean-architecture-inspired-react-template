import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, expect, test, vi } from 'vitest'
import { Dialog } from './Dialog.tsx'

beforeEach(() => {
  const portalRoot = document.createElement('div')
  portalRoot.setAttribute('id', 'portal-root')
  document.body.append(portalRoot)
})

test('should render component', () => {
  // given / when
  render(<Dialog open={true} title="" description="" onConfirm={vi.fn()} onClose={vi.fn()} />)

  // then
  expect(screen.getByTestId('dialog')).toBeInTheDocument()
})

test('should render component wrapped in overlay', () => {
  // given / when
  render(<Dialog open={true} title="" description="" onConfirm={vi.fn()} onClose={vi.fn()} />)

  // then
  expect(screen.getByTestId('dialog').parentElement?.dataset.testid).toEqual('overlay')
})

test('should render component inside portal', () => {
  // given / when
  render(<Dialog open={true} title="" description="" onConfirm={vi.fn()} onClose={vi.fn()} />)

  // then
  expect(screen.getByTestId('overlay').parentElement?.id).toEqual('portal-root')
})

test('should render title and description', () => {
  // given / when
  render(<Dialog open={true} title="test-title" description="test-description" onConfirm={vi.fn()} onClose={vi.fn()} />)

  // then
  expect(screen.getByText('test-title')).toBeInTheDocument()
  expect(screen.getByText('test-description')).toBeInTheDocument()
})

test('should render controls', async () => {
  // given / when
  render(<Dialog open={true} title="" description="" onConfirm={vi.fn()} onClose={vi.fn()} />)

  // then
  expect(screen.getByText('Ok')).toBeInTheDocument()
  expect(screen.getByText('Cancel')).toBeInTheDocument()
})

test('should call onConfirm if confirm control is clicked', async () => {
  const user = userEvent.setup()

  // given
  const onConfirm = vi.fn()
  render(<Dialog open={true} title="" description="" onConfirm={onConfirm} onClose={vi.fn()} />)

  // when
  await user.click(screen.getByText('Ok'))

  // then
  expect(onConfirm).toHaveBeenCalled()
})

test('should call onClose if confirm control is clicked', async () => {
  const user = userEvent.setup()

  // given
  const onClose = vi.fn()
  render(<Dialog open={true} title="" description="" onConfirm={vi.fn()} onClose={onClose} />)

  // when
  await user.click(screen.getByText('Cancel'))

  // then
  expect(onClose).toHaveBeenCalled()
})

test('should call onClose if overlay is clicked', async () => {
  const user = userEvent.setup()

  // given
  const onClose = vi.fn()
  render(<Dialog open={true} title="" description="" onConfirm={vi.fn()} onClose={onClose} />)

  // when
  await user.click(screen.getByTestId('overlay'))

  // then
  expect(onClose).toHaveBeenCalled()
})

test('should not call onClose if dialog is clicked', async () => {
  const user = userEvent.setup()

  // given
  const onClose = vi.fn()
  render(<Dialog open={true} title="" description="" onConfirm={vi.fn()} onClose={onClose} />)

  // when
  await user.click(screen.getByTestId('dialog'))

  // then
  expect(onClose).not.toHaveBeenCalled()
})

test('should not render dialog if closed', () => {
  // given / when
  render(<Dialog open={false} title="" description="" onConfirm={vi.fn()} onClose={vi.fn()} />)

  // then
  expect(screen.queryByTestId('overlay')).not.toBeInTheDocument()
  expect(screen.queryByTestId('dialog')).not.toBeInTheDocument()
})
