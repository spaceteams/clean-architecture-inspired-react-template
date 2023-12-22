import { CSSProperties, FC } from 'react'

type Props = {
  readonly style?: CSSProperties
  readonly label: string
  readonly onClick: () => void
}

export const Button: FC<Props> = ({ style, label, onClick }) => (
  <button style={{ ...style, padding: '0.25rem', textAlign: 'center' }} onClick={() => onClick()}>
    {label}
  </button>
)
