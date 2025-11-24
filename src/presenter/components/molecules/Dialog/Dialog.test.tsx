import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Dialog } from './Dialog.tsx'

beforeEach(() => {
  const portalRoot = document.createElement('div')
  portalRoot.setAttribute('id', 'portal-root')
  document.body.append(portalRoot)
})

describe('Dialog', () => {
  describe('when user interacts with dialog', () => {
    it('should execute confirm action when user clicks OK', async () => {
      const user = userEvent.setup()
      const onConfirm = vi.fn()

      render(
        <Dialog
          open={true}
          title="Delete Item"
          description="Are you sure?"
          onConfirm={onConfirm}
          onClose={vi.fn()} />,
      )

      await user.click(screen.getByText('Ok'))

      expect(onConfirm).toHaveBeenCalledOnce()
    })

    it('should execute cancel action when user clicks Cancel', async () => {
      const user = userEvent.setup()
      const onClose = vi.fn()

      render(
        <Dialog
          open={true}
          title="Delete Item"
          description="Are you sure?"
          onConfirm={vi.fn()}
          onClose={onClose} />,
      )

      await user.click(screen.getByText('Cancel'))

      expect(onClose).toHaveBeenCalledOnce()
    })

    it('should execute cancel action when user clicks outside dialog area', async () => {
      const user = userEvent.setup()
      const onClose = vi.fn()

      render(
        <Dialog
          open={true}
          title="Delete Item"
          description="Are you sure?"
          onConfirm={vi.fn()}
          onClose={onClose} />,
      )

      await user.click(screen.getByTestId('overlay'))

      expect(onClose).toHaveBeenCalledOnce()
    })

    it('should not execute any action when user clicks inside dialog content area', async () => {
      const user = userEvent.setup()
      const onClose = vi.fn()
      const onConfirm = vi.fn()

      render(
        <Dialog
          open={true}
          title="Delete Item"
          description="Are you sure?"
          onConfirm={onConfirm}
          onClose={onClose} />,
      )

      await user.click(screen.getByTestId('dialog'))

      expect(onClose).not.toHaveBeenCalled()
      expect(onConfirm).not.toHaveBeenCalled()
    })
  })

  describe('when dialog visibility changes', () => {
    it('should display content when opened', () => {
      render(
        <Dialog
          open={true}
          title="Confirmation"
          description="Please confirm your action"
          onConfirm={vi.fn()}
          onClose={vi.fn()} />,
      )

      expect(screen.getByText('Confirmation')).toBeInTheDocument()
      expect(screen.getByText('Please confirm your action')).toBeInTheDocument()
    })

    it('should hide content when closed', () => {
      render(
        <Dialog
          open={false}
          title="Confirmation"
          description="Please confirm your action"
          onConfirm={vi.fn()}
          onClose={vi.fn()} />,
      )

      expect(screen.queryByText('Confirmation')).not.toBeInTheDocument()
      expect(screen.queryByText('Please confirm your action')).not.toBeInTheDocument()
    })
  })
})
