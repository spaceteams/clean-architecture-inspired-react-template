import { css } from '@emotion/react'
import { FC } from 'react'

type HeaderProps = {
  readonly title: string
}

export const Header: FC<HeaderProps> = ({ title }) => (
  <h2 css={styles.header}>
    {title}
  </h2>
)

const styles = {
  header: css({ marginBottom: '2rem' }),
}
