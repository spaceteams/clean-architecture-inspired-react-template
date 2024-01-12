import { css } from '@emotion/react'
import { FC, MouseEvent } from 'react'

// eslint-disable-next-line @stylistic/max-len
const TRASH_ICON = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDMyIDMyIiBoZWlnaHQ9IjMycHgiIGlkPSJMYXllcl8xIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAzMiAzMiIgd2lkdGg9IjMycHgiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxnIGlkPSJ0cmFzaCI+PHBhdGggY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMjkuOTgsNi44MTljLTAuMDk2LTEuNTctMS4zODctMi44MTYtMi45OC0yLjgxNmgtM3YtMVYzLjAwMSAgIGMwLTEuNjU3LTEuMzQ0LTMtMy0zSDExYy0xLjY1NywwLTMsMS4zNDMtMywzdjAuMDAxdjFINWMtMS41OTUsMC0yLjg4NSwxLjI0Ni0yLjk4MSwyLjgxNkgydjEuMTgzdjFjMCwxLjEwNCwwLjg5NiwyLDIsMmwwLDB2MTcgICBjMCwyLjIwOSwxLjc5MSw0LDQsNGgxNmMyLjIwOSwwLDQtMS43OTEsNC00di0xN2wwLDBjMS4xMDQsMCwyLTAuODk2LDItMnYtMVY2LjgxOUgyOS45OHogTTEwLDMuMDAyYzAtMC41NTMsMC40NDctMSwxLTFoMTAgICBjMC41NTMsMCwxLDAuNDQ3LDEsMXYxSDEwVjMuMDAyeiBNMjYsMjguMDAyYzAsMS4xMDItMC44OTgsMi0yLDJIOGMtMS4xMDMsMC0yLTAuODk4LTItMnYtMTdoMjBWMjguMDAyeiBNMjgsOC4wMDF2MUg0di0xVjcuMDAyICAgYzAtMC41NTMsMC40NDctMSwxLTFoMjJjMC41NTMsMCwxLDAuNDQ3LDEsMVY4LjAwMXoiIGZpbGw9IiMzMzMzMzMiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjxwYXRoIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTksMjguMDA2aDJjMC41NTMsMCwxLTAuNDQ3LDEtMXYtMTNjMC0wLjU1My0wLjQ0Ny0xLTEtMUg5ICAgYy0wLjU1MywwLTEsMC40NDctMSwxdjEzQzgsMjcuNTU5LDguNDQ3LDI4LjAwNiw5LDI4LjAwNnogTTksMTQuMDA1aDJ2MTNIOVYxNC4wMDV6IiBmaWxsPSIjMzMzMzMzIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48cGF0aCBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNSwyOC4wMDZoMmMwLjU1MywwLDEtMC40NDcsMS0xdi0xM2MwLTAuNTUzLTAuNDQ3LTEtMS0xaC0yICAgYy0wLjU1MywwLTEsMC40NDctMSwxdjEzQzE0LDI3LjU1OSwxNC40NDcsMjguMDA2LDE1LDI4LjAwNnogTTE1LDE0LjAwNWgydjEzaC0yVjE0LjAwNXoiIGZpbGw9IiMzMzMzMzMiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjxwYXRoIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTIxLDI4LjAwNmgyYzAuNTUzLDAsMS0wLjQ0NywxLTF2LTEzYzAtMC41NTMtMC40NDctMS0xLTFoLTIgICBjLTAuNTUzLDAtMSwwLjQ0Ny0xLDF2MTNDMjAsMjcuNTU5LDIwLjQ0NywyOC4wMDYsMjEsMjguMDA2eiBNMjEsMTQuMDA1aDJ2MTNoLTJWMTQuMDA1eiIgZmlsbD0iIzMzMzMzMyIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9nPjwvc3ZnPg=='

type Props = {
  readonly title: string
  readonly onClick: () => void
  readonly onDelete: () => void
}

export const ListItem: FC<Props> = ({ title, onClick, onDelete }) => {
  const handleDelete = (evt: MouseEvent<HTMLImageElement>) => {
    evt.stopPropagation()
    console.log('DELETE')
    onDelete()
  }

  return (
    <div css={styles.wrapper} onClick={() => onClick()}>
      <div css={styles.title}>
        {title}
      </div>

      <img css={styles.icon} src={TRASH_ICON} alt="delete" onClick={handleDelete} />
    </div>
  )
}

const styles = {
  wrapper: css({
    height: '2.5rem',
    lineHeight: '2.5rem',
    display: 'flex',
    flexDirection: 'row',
    columnGap: '0.5rem',
    border: '1px solid black',
    padding: '0.75rem',
    borderRadius: '0.25rem',
    cursor: 'pointer',
  }),
  title: css({ flex: '1 1 auto', fontSize: '1.5em' }),
  icon: css({ width: '1.5rem', height: 'auto' }),
}
