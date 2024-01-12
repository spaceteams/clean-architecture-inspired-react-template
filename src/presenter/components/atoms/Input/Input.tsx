import { css } from '@emotion/react'
import { FC } from 'react'

type Props = {
  readonly label: string
  readonly value?: string
  readonly onChange: (value: string) => void
}

export const Input: FC<Props> = ({ label, value, onChange }) => (
  <div css={styles.wrapper}>
    <h6 css={styles.label}>
      {label}
      :
    </h6>

    <input css={styles.input} type="text" value={value} onChange={evt => onChange(evt.target.value)} />
  </div>
)

const styles = {
  wrapper: css({ display: 'flex', flexDirection: 'column', rowGap: '0.5rem' }),
  label: css({ textAlign: 'start' }),
  input: css({
    height: '2.5rem',
    lineHeight: '2.5rem',
    borderRadius: '0.25rem',
    border: '1px solid rgb(26, 26, 26)',
    padding: '0.75rem',
    fontSize: '1.5rem',
  }),
}
