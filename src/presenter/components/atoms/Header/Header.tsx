import { css } from '@emotion/react'
import { FC } from 'react'

type Props = {
  readonly title: string
}

export const Header: FC<Props> = ({ title }) => (
  <h2 css={styles.header}>
    {title}
  </h2>
)

const styles = {
  header: css({ marginBottom: '2rem' }),
}
