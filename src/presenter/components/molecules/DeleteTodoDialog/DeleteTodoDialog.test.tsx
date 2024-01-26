import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, expect, test, vi } from 'vitest'
import { DeleteTodoDialog } from './DeleteTodoDialog.tsx'

beforeEach(() => {
  const portalRoot = document.createElement('div')
  portalRoot.setAttribute('id', 'portal-root')
  document.body.append(portalRoot)
})

test('should render dialog', () => {
  // given / when
  render(<DeleteTodoDialog open={true} todoName="" onConfirm={vi.fn()} onCancel={vi.fn()} />)

  // then
  expect(screen.getByTestId('dialog')).toBeInTheDocument()
})

test('should render dialog wrapped in overlay', () => {
  // given / when
  render(<DeleteTodoDialog open={true} todoName="" onConfirm={vi.fn()} onCancel={vi.fn()} />)

  // then
  expect(screen.getByTestId('dialog').parentElement?.dataset.testid).toEqual('overlay')
})

test('should render dialog inside portal', () => {
  // given / when
  render(<DeleteTodoDialog open={true} todoName="" onConfirm={vi.fn()} onCancel={vi.fn()} />)

  // then
  expect(screen.getByTestId('overlay').parentElement?.id).toEqual('portal-root')
})

test('should render title and description', () => {
  // given / when
  render(<DeleteTodoDialog open={true} todoName="test-todo" onConfirm={vi.fn()} onCancel={vi.fn()} />)

  // then
  expect(screen.getByText('Delete TODO?')).toBeInTheDocument()
  expect(
    screen.getByText('The TODO "test-todo" will be removed permanently. Do you want to proceed?'),
  ).toBeInTheDocument()
})

test('should render controls', async () => {
  // given / when
  render(<DeleteTodoDialog open={true} todoName="" onConfirm={vi.fn()} onCancel={vi.fn()} />)

  // then
  expect(screen.getByText('Ok')).toBeInTheDocument()
  expect(screen.getByText('Cancel')).toBeInTheDocument()
})

test('should call onConfirm if deletion is confirmed', async () => {
  const user = userEvent.setup()

  // given
  const onConfirm = vi.fn()
  render(<DeleteTodoDialog open={true} todoName="" onConfirm={onConfirm} onCancel={vi.fn()} />)

  // when
  await user.click(screen.getByText('Ok'))

  // then
  expect(onConfirm).toHaveBeenCalled()
})

test('should call onCancel if deletion is canceled per click on button', async () => {
  const user = userEvent.setup()

  // given
  const onCancel = vi.fn()
  render(<DeleteTodoDialog open={true} todoName="" onConfirm={vi.fn()} onCancel={onCancel} />)

  // when
  await user.click(screen.getByText('Cancel'))

  // then
  expect(onCancel).toHaveBeenCalled()
})

test('should call onCancel if deletion is canceled per click on overlay', async () => {
  const user = userEvent.setup()

  // given
  const onCancel = vi.fn()
  render(<DeleteTodoDialog open={true} todoName="" onConfirm={vi.fn()} onCancel={onCancel} />)

  // when
  await user.click(screen.getByTestId('overlay'))

  // then
  expect(onCancel).toHaveBeenCalled()
})

test('should not call onCancel if dialog is clicked', async () => {
  const user = userEvent.setup()

  // given
  const onCancel = vi.fn()
  render(<DeleteTodoDialog open={true} todoName="" onConfirm={vi.fn()} onCancel={onCancel} />)

  // when
  await user.click(screen.getByText('Delete TODO?').parentElement!)

  // then
  expect(onCancel).not.toHaveBeenCalled()
})

test('should not render dialog if closed', () => {
  // given / when
  render(<DeleteTodoDialog open={false} todoName="" onConfirm={vi.fn()} onCancel={vi.fn()} />)

  // then
  expect(screen.queryByTestId('overlay')).not.toBeInTheDocument()
  expect(screen.queryByTestId('dialog')).not.toBeInTheDocument()
})
