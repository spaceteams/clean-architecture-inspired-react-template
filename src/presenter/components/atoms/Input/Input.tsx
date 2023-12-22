import { FC } from 'react'

type Props = {
  readonly label: string
  readonly value?: string
  readonly onChange: (value: string) => void
}

export const Input: FC<Props> = ({ label, value, onChange }) => (
  <div style={{ display: 'flex', flexDirection: 'column', rowGap: '0.25rem' }}>
    <div style={{ textAlign: 'start' }}>
      {label}
      :
    </div>

    <input type="text" value={value} onChange={evt => onChange(evt.target.value)} />
  </div>
)
