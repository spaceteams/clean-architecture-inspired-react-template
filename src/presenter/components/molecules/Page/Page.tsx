import { css } from '@emotion/react'
import { FC, PropsWithChildren, ReactNode } from 'react'
import { fullWidthAndHeight } from '../../../styles'
import { Footer } from '../../atoms/Footer/Footer.tsx'
import { Header } from '../../atoms/Header/Header.tsx'
import { Content } from '../../atoms/Content/Content.tsx'

type PageProps = {
  readonly headline: string
  readonly footer?: ReactNode
}

export const Page: FC<PropsWithChildren<PageProps>> = ({ headline, footer, children }) => (
  <div data-testid="page" css={styles.page}>
    <Header title={headline} />

    <Content>
      {children}
    </Content>

    {footer && (
      <Footer>
        {footer}
      </Footer>
    )}
  </div>
)

const styles = {
  page: css([fullWidthAndHeight, { display: 'flex', flexDirection: 'column' }]),
}
