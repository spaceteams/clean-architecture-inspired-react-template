import { css, Global } from '@emotion/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import { colors } from './presenter/styles'

// TODO: Clean up styling (move re-used stylings into styles/index.ts)
// TODO: Clean-up and refactor code
// TODO: Setup tests
// TODO: Update README (Explain Structure & Components, Add link to code.talks video)

const styles = {
  body: css({
    body: {
      fontFamily: '"Roboto", sans-serif',
      fontWeight: 400,
      lineHeight: 1.5,
      fontStyle: 'normal',
      background: 'white',
      color: colors.text,
    },
  }),
  root: css({
    '#root': {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
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
      fontSize: 60,
    },
    'h6': {
      fontSize: 20,
    },
  }),
  button: css({
    button: {
      fontFamily: 'inherit',
      height: '2.5em',
      padding: '0.5em',
      textAlign: 'center',
      fontSize: '1.5em',
      borderRadius: '0.5em',
      border: 0,
      cursor: 'pointer',
      color: 'white',
      backgroundColor: colors.backgroundDark,
      '&:hover': {
        backgroundColor: colors.backgroundDarkLight,
      },
    },
  }),
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Global styles={[styles.body, styles.root, styles.textInputs, styles.headlines, styles.button]} />
    <App />
  </React.StrictMode>,
)
