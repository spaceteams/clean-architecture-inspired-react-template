import { css } from '@emotion/react'
import { FC } from 'react'
import { borderRadius, color, fontSize } from '../../../styles'

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
    borderRadius: borderRadius.small,
    border: `1px solid ${color.border}`,
    padding: '0.75rem',
    fontSize: fontSize.text,
    '&:not(:focus):hover': {
      backgroundColor: color.backgroundLight,
    },
  }),
}
