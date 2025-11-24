import { render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { Portal } from './Portal.tsx'

describe('Portal', () => {
  beforeEach(() => {
    // Setup default portal root for tests
    const portalRoot = document.createElement('div')
    portalRoot.setAttribute('id', 'portal-root')
    document.body.append(portalRoot)
  })

  afterEach(() => {
    // Clean up DOM after each test
    document.body.innerHTML = ''
  })

  it('should render children when default container exists', () => {
    // given
    const content = <div>test content</div>

    // when
    render(
      <Portal>
        {content}
      </Portal>,
    )

    // then
    expect(screen.getByText('test content')).toBeInTheDocument()
  })

  it('should render children when custom target is provided', () => {
    // given
    const customTarget = document.createElement('div')
    document.body.append(customTarget)
    const content = <div>custom content</div>

    // when
    render(
      <Portal target={customTarget}>
        {content}
      </Portal>,
    )

    // then
    expect(screen.getByText('custom content')).toBeInTheDocument()
  })

  it('should handle gracefully when no container exists', () => {
    // given
    document.querySelector('#portal-root')?.remove()
    const content = <div>no container content</div>

    // when
    render(
      <Portal>
        {content}
      </Portal>,
    )

    // then
    expect(screen.queryByText('no container content')).not.toBeInTheDocument()
  })

  it('should prioritize custom target over default container', () => {
    // given
    const customTarget = document.createElement('div')
    customTarget.setAttribute('data-testid', 'custom-target')
    document.body.append(customTarget)
    const content = <div>priority test</div>

    // when
    render(
      <Portal target={customTarget}>
        {content}
      </Portal>,
    )

    // then
    expect(screen.getByText('priority test')).toBeInTheDocument()
    expect(customTarget).toContainElement(screen.getByText('priority test'))
  })
})
