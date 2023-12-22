import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, expect, test, vi } from 'vitest'
import { CreateTodo } from './CreateTodo.tsx'

beforeEach(() => {
  localStorage.setItem('todos', '[]')

  vi.useFakeTimers()
  vi.setSystemTime(new Date('2011-11-11T11:11:11.000Z'))

  // https://github.com/vitest-dev/vitest/issues/3184#issuecomment-1506219115
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  globalThis.jest = {
    advanceTimersByTime: vi.advanceTimersByTime,
  }
})

test('should render page with title, input, textarea, and create button', () => {
  // given / when
  render(<CreateTodo />)

  // then
  expect(screen.getByTestId('page')).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: 'Create TODO' })).toBeInTheDocument()

  expect(screen.getByTestId('content')).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: 'Title:' })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: 'Description:' })).toBeInTheDocument()

  const inputs = screen.getAllByRole('textbox')
  expect(inputs).toHaveLength(2)
  expect(inputs[0].tagName).toEqual('INPUT')
  expect(inputs[1].tagName).toEqual('TEXTAREA')

  expect(screen.getByTestId('footer')).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Create' })).toBeInTheDocument()
})

test('should create todo with entered title and description', async () => {
  const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })

  // given
  render(<CreateTodo />)

  const inputs = screen.getAllByRole('textbox')

  // when
  await user.type(inputs[0], 'test-title')
  await user.type(inputs[1], 'test-description')
  await user.click(screen.getByRole('button', { name: 'Create' }))

  // then
  expect(localStorage.getItem('todos')).toEqual(
    JSON.stringify([{ title: 'test-title', description: 'test-description', id: '1321009871000' }]),
  )
})

test('should create todo without title and description', async () => {
  const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })

  // given
  render(<CreateTodo />)

  // when
  await user.click(screen.getByRole('button', { name: 'Create' }))

  // then
  expect(localStorage.getItem('todos')).toEqual(
    JSON.stringify([{ title: '', description: '', id: '1321009871000' }]),
  )
})
