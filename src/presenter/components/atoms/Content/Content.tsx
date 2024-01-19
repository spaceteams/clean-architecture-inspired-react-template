import { css, SerializedStyles } from '@emotion/react'
import { Property } from 'csstype'
import { FC, PropsWithChildren } from 'react'
import { flex1 } from '../../../styles'

type ContentProps = {
  readonly customStyles?: SerializedStyles
  readonly direction?: Property.FlexDirection
}

export const Content: FC<PropsWithChildren<ContentProps>> = ({ direction = 'column', customStyles, children }) => (
  <div css={[styles.wrapper, { flexDirection: direction }, customStyles]}>
    {children}
  </div>
)

const styles = {
  wrapper: css([flex1, { display: 'flex', gap: '1rem' }]),
}
