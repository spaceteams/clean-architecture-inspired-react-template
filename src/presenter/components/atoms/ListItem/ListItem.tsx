import { css } from '@emotion/react'
import { FC, MouseEvent } from 'react'
import TrashIcon from '../../../assets/icons/trash.svg?react'
import { borderRadius, color, flex1, fontSize } from '../../../styles'

type Props = {
  readonly title: string
  readonly onClick: () => void
  readonly onDelete: () => void
}

export const ListItem: FC<Props> = ({ title, onClick, onDelete }) => {
  const handleDelete = (evt: MouseEvent<SVGSVGElement>) => {
    evt.stopPropagation()
    onDelete()
  }

  return (
    <>
      <div css={styles.wrapper} onClick={() => onClick()}>
        <div css={styles.title}>
          {title}
        </div>

        <TrashIcon css={styles.icon} onClick={handleDelete} />
      </div>
    </>
  )
}

const styles = {
  wrapper: css({
    height: '2.5rem',
    lineHeight: '2.5rem',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: '0.5rem',
    border: `1px solid ${color.border}`,
    padding: '0.75rem',
    borderRadius: borderRadius.small,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: color.backgroundLight,
    },
  }),
  title: css([flex1, { fontSize: fontSize.text }]),
  icon: css({
    width: '1.5rem',
    height: 'auto',
    fill: color.backgroundDark,
    '&:hover': { fill: color.backgroundDarkLighter },
  }),
}
