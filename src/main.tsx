import { css, Global } from '@emotion/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import { absolutePosition, borderRadius, color, fontSize } from './presenter/styles'

// TODO: Setup tests
// TODO --> github workflows aufsetzen --> Bei PR immer tests laufen lassen!
// TODO: Check if code need further clean-up and refactor
// TODO: Update README (Explain Structure & Components, Add link to code.talks video)

const styles = {
  body: css({
    body: {
      fontFamily: '"Roboto", sans-serif',
      fontWeight: 400,
      lineHeight: 1.5,
      fontStyle: 'normal',
      backgroundColor: 'white',
      color: color.text,
    },
  }),
  root: css({
    '#root': absolutePosition,
  }),
  textInputs: css({
    'input, textarea': {
      fontFamily: 'inherit',
    },
  }),
  headlines: css({
    'h2, h6': {
      marginBlockStart: 0,
      marginBlockEnd: 0,
      marginInlineStart: 0,
      marginInlineEnd: 0,
      fontWeight: 'inherit',
    },
    'h2': {
      fontSize: fontSize.heading1,
    },
    'h6': {
      fontSize: fontSize.heading2,
    },
  }),
  button: css({
    button: {
      fontFamily: 'inherit',
      height: '2.5em',
      padding: '0.5em',
      textAlign: 'center',
      fontSize: fontSize.text,
      borderRadius: borderRadius.normal,
      border: 0,
      cursor: 'pointer',
      color: 'white',
      backgroundColor: color.backgroundDark,
      '&:hover': {
        backgroundColor: color.backgroundDarkLight,
      },
    },
  }),
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Global styles={[styles.body, styles.root, styles.textInputs, styles.headlines, styles.button]} />
    <App />
    <div id="portal-root" />
  </React.StrictMode>,
)
