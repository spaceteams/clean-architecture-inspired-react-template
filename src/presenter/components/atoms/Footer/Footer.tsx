import { css } from '@emotion/react'
import { FC, PropsWithChildren } from 'react'

export const Footer: FC<PropsWithChildren> = ({ children }) => (
  <div data-testid="footer" css={styles.footer}>
    {children}
  </div>
)

const styles = {
  footer: css({ marginTop: '2rem' }),
}
