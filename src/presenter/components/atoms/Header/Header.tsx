import { FC } from 'react'

type Props = {
  readonly title: string
}

export const Header: FC<Props> = ({ title }) => (
  <h2>
    {title}
  </h2>
)
