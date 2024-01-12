import { css } from '@emotion/react'
import { FC, PropsWithChildren } from 'react'
import { fullWidthAndHeight } from '../../../styles'
import { Header } from '../../atoms/Header/Header.tsx'
import { Content } from '../../atoms/PageContent/Content.tsx'

type PageProps = {
  readonly headline: string
}

export const Page: FC<PropsWithChildren<PageProps>> = ({ headline, children }) => (
  <div css={styles.page}>
    <Header title={headline} />

    <Content>
      {children}
    </Content>
  </div>
)

const styles = {
  page: css([fullWidthAndHeight, { display: 'flex', flexDirection: 'column' }]),
}
