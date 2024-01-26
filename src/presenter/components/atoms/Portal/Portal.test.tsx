import { render, screen } from '@testing-library/react'
import { beforeEach, expect, test } from 'vitest'
import { Portal } from './Portal.tsx'

beforeEach(() => {
  const portalRoot = document.createElement('div')
  portalRoot.setAttribute('id', 'portal-root')
  document.body.append(portalRoot)
})

test('should render content in target', () => {
  // given / when
  const content = <div>content</div>
  render(
    <Portal>
      {content}
    </Portal>,
  )

  // then
  expect(screen.getByText('content')).toBeInTheDocument()
})

test('should render content in default target', () => {
  // given / when
  const content = <div>content</div>
  render(
    <Portal>
      {content}
    </Portal>,
  )

  // then
  expect(screen.getByText('content').parentElement?.id).toEqual('portal-root')
})

test('should render content in custom target', () => {
  const customPortalRoot = document.createElement('div')
  customPortalRoot.setAttribute('id', 'custom-portal-root')
  document.body.append(customPortalRoot)

  // given / when
  const content = <div>content</div>
  render(
    <Portal target={customPortalRoot}>
      {content}
    </Portal>,
  )

  // then
  expect(screen.getByText('content').parentElement?.id).toEqual('custom-portal-root')
  expect(document.querySelector('#portal-root')?.childElementCount).toEqual(0)
})
