import { SerializedStyles } from '@emotion/react'
import { FC } from 'react'

type Props = {
  readonly customStyles?: SerializedStyles | SerializedStyles[]
  readonly label: string
  readonly onClick: () => void
}

export const Button: FC<Props> = ({ customStyles, label, onClick }) => (
  <button css={customStyles} onClick={() => onClick()}>
    {label}
  </button>
)
