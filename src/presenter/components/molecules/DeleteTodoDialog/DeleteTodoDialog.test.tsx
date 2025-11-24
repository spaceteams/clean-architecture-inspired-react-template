import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { DeleteTodoDialog } from './DeleteTodoDialog.tsx'

beforeEach(() => {
  const portalRoot = document.createElement('div')
  portalRoot.setAttribute('id', 'portal-root')
  document.body.append(portalRoot)
})

describe('DeleteTodoDialog', () => {
  describe('when dialog is open', () => {
    it('should display confirmation message with todo name', () => {
      // given / when
      render(<DeleteTodoDialog open={true} todoName="My Important Task" onConfirm={vi.fn()} onCancel={vi.fn()} />)

      // then
      expect(screen.getByText('Delete TODO?')).toBeInTheDocument()
      expect(
        screen.getByText('The TODO "My Important Task" will be removed permanently. Do you want to proceed?'),
      ).toBeInTheDocument()
    })

    it.each([
      ['onConfirm', 'Ok'],
      ['onCancel', 'Cancel'],
    ])('should call %s callback when user clicks %s button', async (callbackName, buttonText) => {
      const user = userEvent.setup()
      const mockCallback = vi.fn()
      const props = {
        open: true,
        todoName: 'Test Todo',
        onConfirm: callbackName === 'onConfirm' ? mockCallback : vi.fn(),
        onCancel: callbackName === 'onCancel' ? mockCallback : vi.fn(),
      }

      // given
      render(<DeleteTodoDialog {...props} />)

      // when
      await user.click(screen.getByText(buttonText))

      // then
      expect(mockCallback).toHaveBeenCalledOnce()
    })

    it('should call onCancel callback when user clicks outside dialog', async () => {
      const user = userEvent.setup()
      const onCancel = vi.fn()

      // given
      render(<DeleteTodoDialog open={true} todoName="Test" onConfirm={vi.fn()} onCancel={onCancel} />)

      // when
      await user.click(screen.getByTestId('overlay'))

      // then
      expect(onCancel).toHaveBeenCalledOnce()
    })

    it('should not trigger cancel when clicking inside dialog content', async () => {
      const user = userEvent.setup()
      const onCancel = vi.fn()

      // given
      render(<DeleteTodoDialog open={true} todoName="Test" onConfirm={vi.fn()} onCancel={onCancel} />)

      // when
      await user.click(screen.getByText('Delete TODO?'))

      // then
      expect(onCancel).not.toHaveBeenCalled()
    })
  })

  describe('when dialog is closed', () => {
    it('should not display any dialog content', () => {
      // given / when
      render(<DeleteTodoDialog open={false} todoName="Test" onConfirm={vi.fn()} onCancel={vi.fn()} />)

      // then
      expect(screen.queryByText('Delete TODO?')).not.toBeInTheDocument()
      expect(screen.queryByText('Ok')).not.toBeInTheDocument()
      expect(screen.queryByText('Cancel')).not.toBeInTheDocument()
    })
  })
})
