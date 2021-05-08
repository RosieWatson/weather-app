import { cleanup, fireEvent, render, screen } from '@testing-library/react'

import SearchBar from './SearchBar'

describe('SearchBar', () => {
  const searchActionMock = jest.fn()

  beforeEach(() => {
    render(<SearchBar searchAction={searchActionMock} />)
  })

  afterAll(cleanup)

  describe('when a user does a search', () => {
    it('calls the search action with the value they typed in', () => {
      const input = screen.getByLabelText('City name')

      fireEvent.change(input, { target: { value: 'Newcastle' } })
      fireEvent.click(screen.getByText('Search'))

      expect(searchActionMock).toHaveBeenCalledWith('Newcastle', true)
    })
  })
})
