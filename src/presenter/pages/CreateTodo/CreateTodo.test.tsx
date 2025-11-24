import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { DI } from '../../../di/ioc.ts'
import { CreateTodo } from './CreateTodo.tsx'

// Mock the DI container to spy on business logic
vi.mock('../../../di/ioc.ts', () => ({
  DI: {
    resolve: vi.fn(),
  },
}))

// Mock react-router-dom to avoid navigation issues during tests
vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
}))

describe('CreateTodo Page', () => {
  let mockCreateTodo: ReturnType<typeof vi.fn>
  let mockSetTitle: ReturnType<typeof vi.fn>
  let mockSetDescription: ReturnType<typeof vi.fn>

  beforeEach(() => {
    vi.clearAllMocks()

    mockCreateTodo = vi.fn()
    mockSetTitle = vi.fn()
    mockSetDescription = vi.fn()

    // Mock the view model to return spy functions
    vi.mocked(DI.resolve).mockReturnValue({
      createTodo: mockCreateTodo,
      setTitle: mockSetTitle,
      setDescription: mockSetDescription,
    })

    vi.useFakeTimers()
    vi.setSystemTime(new Date('2011-11-11T11:11:11.000Z'))

    // https://github.com/vitest-dev/vitest/issues/3184#issuecomment-1506219115
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    globalThis.jest = {
      advanceTimersByTime: vi.advanceTimersByTime,
    }
  })

  describe('Todo Creation Business Logic', () => {
    it.each([
      ['test-title', 'test-description'],
      ['', ''],
      ['Only title', ''],
      ['', 'Only description'],
    ])('should create todo when title is "%s" and description is "%s"', async (title, description) => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })

      // given
      render(<CreateTodo />)
      const inputs = screen.getAllByRole('textbox')

      // when
      if (title) await user.type(inputs[0], title)
      if (description) await user.type(inputs[1], description)
      await user.click(screen.getByRole('button', { name: 'Create' }))

      // then
      expect(mockCreateTodo).toHaveBeenCalledTimes(1)
    })

    it('should update title when user types in title field', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })

      // given
      render(<CreateTodo />)
      const titleInput = screen.getAllByRole('textbox')[0]

      // when
      await user.type(titleInput, 'My Todo Title')

      // then
      expect(mockSetTitle).toHaveBeenCalledTimes('My Todo Title'.length)
      expect(mockSetTitle).toHaveBeenLastCalledWith('My Todo Title')
    })

    it('should update description when user types in description field', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })

      // given
      render(<CreateTodo />)
      const descriptionInput = screen.getAllByRole('textbox')[1]

      // when
      await user.type(descriptionInput, 'My description')

      // then
      expect(mockSetDescription).toHaveBeenCalledTimes('My description'.length)
      expect(mockSetDescription).toHaveBeenLastCalledWith('My description')
    })
  })

  describe('User Interface', () => {
    it('should render all required form elements for todo creation', () => {
      // given / when
      render(<CreateTodo />)

      // then
      expect(screen.getByRole('heading', { name: 'Create TODO' })).toBeInTheDocument()
      expect(screen.getByRole('heading', { name: 'Title:' })).toBeInTheDocument()
      expect(screen.getByRole('heading', { name: 'Description:' })).toBeInTheDocument()

      const inputs = screen.getAllByRole('textbox')
      expect(inputs).toHaveLength(2)
      expect(inputs[0].tagName).toEqual('INPUT')
      expect(inputs[1].tagName).toEqual('TEXTAREA')

      expect(screen.getByRole('button', { name: 'Create' })).toBeInTheDocument()
    })
  })
})
