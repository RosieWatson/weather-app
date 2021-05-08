import { cleanup, fireEvent, render, screen } from '@testing-library/react'

import HistoryDisplay from './HistoryDisplay'

describe('HistoryDisplay', () => {
  const searchActionMock = jest.fn()

  beforeEach(() => {
    render(<HistoryDisplay history={['Canterbury', 'London']} searchAction={searchActionMock} />)
  })

  afterAll(cleanup)
  
  it('displays the previously searched cities', () => {
    expect(screen.getByText('Canterbury')).toBeDefined()
    expect(screen.getByText('London')).toBeDefined()
  })

  describe('when a user clicks a previous city', () => {
    it('calls the search action with said city', () => {
      fireEvent.click(screen.getByText('Canterbury'))
      expect(searchActionMock).toHaveBeenCalledWith('Canterbury', false)
    })
  })
})
