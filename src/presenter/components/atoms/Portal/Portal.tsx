import { FC, PropsWithChildren } from 'react'
import { createPortal } from 'react-dom'

type PortalProps = {
  target?: Element | DocumentFragment
}

export const Portal: FC<PropsWithChildren<PortalProps>> = ({ target, children }) => {
  const container = target ?? document.querySelector('#portal-root')

  return container ? createPortal(children, container) : null
}
