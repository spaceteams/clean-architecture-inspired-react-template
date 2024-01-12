import { css, SerializedStyles } from '@emotion/react'
import { FC } from 'react'

type Props = {
  readonly customStyles?: SerializedStyles
  readonly label: string
  readonly value?: string
  readonly onChange: (value: string) => void
}

export const TextArea: FC<Props> = ({ customStyles, label, value, onChange }) => (
  <div css={[styles.wrapper, customStyles]}>
    <h6 css={styles.label}>
      {label}
      :
    </h6>

    <textarea
      css={styles.textArea}
      value={value}
      onChange={evt => onChange(evt.target.value)} />
  </div>
)

const styles = {
  wrapper: css({ display: 'flex', flexDirection: 'column', rowGap: '0.5rem' }),
  label: css({ textAlign: 'start' }),
  textArea: css({
    flex: '1 1 auto',
    minHeight: '2.5rem',
    lineHeight: '2.5rem',
    borderRadius: '0.25rem',
    resize: 'none',
    border: '1px solid rgb(26, 26, 26)',
    padding: '0.75rem',
    fontSize: '1.5rem',
  }),
}
