import { FC } from 'react'

type Props = {
  readonly label: string
  readonly value?: string
  readonly onChange: (value: string) => void
}

export const TextArea: FC<Props> = ({ label, value, onChange }) => (
  <div style={{ display: 'flex', flexDirection: 'column', rowGap: '0.25rem' }}>
    <div style={{ textAlign: 'start' }}>
      {label}
      :
    </div>

    <textarea value={value} onChange={evt => onChange(evt.target.value)} />
  </div>
)
