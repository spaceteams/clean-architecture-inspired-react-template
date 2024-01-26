import { css } from '@emotion/react'
import { FC, PropsWithChildren } from 'react'
import { absolutePosition } from '../../../styles'

type OverlayProps = {
  onClick?: () => void
}

export const Overlay: FC<PropsWithChildren<OverlayProps>> = ({ onClick, children }) => (
  <div data-testid="overlay" css={styles.overlay} onClick={() => onClick?.()}>
    {children}
  </div>
)

const styles = {
  overlay: css([
    absolutePosition,
    {
      backgroundColor: 'rgba(89, 89, 89, 0.4)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  ]),
}
