import { css } from '@emotion/react'
import { FC } from 'react'
import { borderRadius, color } from '../../../styles'
import { Overlay } from '../../atoms/Overlay/Overlay.tsx'
import { Portal } from '../../atoms/Portal/Portal.tsx'

type DialogProps = {
  open: boolean
  title: string
  description: string
  onConfirm: () => void
  onClose: () => void
}

export const Dialog: FC<DialogProps> = ({ open, title, description, onConfirm, onClose }) => (
  <Portal>
    {open && (
      <Overlay onClick={onClose}>
        <div css={styles.dialog} onClick={evt => evt.stopPropagation()}>
          <h6 css={styles.title}>
            {title}
          </h6>

          <div css={styles.description}>
            {description}
          </div>

          <div css={styles.controls}>
            <div css={styles.control} onClick={onClose}>Cancel</div>
            <div css={styles.control} onClick={onConfirm}>Ok</div>
          </div>
        </div>
      </Overlay>
    )}
  </Portal>
)

const styles = {
  dialog: css({
    margin: '2rem',
    maxWidth: 'calc(100% - 4rem)',
    maxHeight: 'calc(100% - 4rem)',
    backgroundColor: color.backgroundDarkLight,
    color: 'white',
    borderRadius: borderRadius.small,
    display: 'flex',
    flexDirection: 'column',
  }),
  title: css({
    padding: '1rem 1.5rem',
  }),
  description: css({
    padding: '0 1.5rem 1rem 1.5rem',
  }),
  controls: css({
    padding: '0.5rem',
    display: 'flex',
    justifyContent: 'flex-end',
    columnGap: '0.5rem',
  }),
  control: css({
    borderRadius: borderRadius.small,
    padding: '0.375rem 0.5rem',
    color: color.control,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: color.backgroundDarkLighter,
    },
  }),
}
