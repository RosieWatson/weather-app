import { cleanup, render, screen } from '@testing-library/react'

import ErrorMessage from './ErrorMessage'

describe('ErrorMessage', () => {
  beforeEach(() => {
    render(<ErrorMessage />)
  })

  afterAll(cleanup)

  it('displays an alert to the user', () => {
    expect(screen.getByRole('alert')).toBeDefined()
  })
})
