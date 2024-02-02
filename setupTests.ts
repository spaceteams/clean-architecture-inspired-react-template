import * as Router from 'react-router'
import { afterEach, beforeEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

beforeEach(() => {
  vi.spyOn(Router, 'useNavigate').mockReturnValue(vi.fn())
})

afterEach(() => {
  cleanup()
})
