import { css } from '@emotion/react'

const PRIMARY_COLOR = '#1A1A1A'

export const color = {
  text: PRIMARY_COLOR,
  control: '#90caf9',
  border: PRIMARY_COLOR,
  backgroundDark: PRIMARY_COLOR,
  backgroundDarkLight: '#3A3A3A',
  backgroundDarkLighter: '#595959',
  backgroundRed: '#B71C1C',
  backgroundRedLight: '#D32F2F',
  backgroundLight: '#F9F9F9',
}

export const borderRadius = {
  small: '0.25rem',
  normal: '0.5rem',
}

export const fontSize = {
  heading1: 60,
  heading2: 20,
  text: '1.5rem',
}

export const absolutePosition = css({
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
})

export const fullWidthAndHeight = css({ width: '100%', height: '100%' })

export const flex1 = css({ flex: '1 1 auto' })

export const flex0 = css({ flex: '0 0 auto' })
