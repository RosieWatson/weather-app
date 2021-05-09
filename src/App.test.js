import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { DateTime } from 'luxon'

import  * as forecastUtils from './utils/forecast'

import App from './App'

jest.mock('./utils/forecast')
describe('App', () => {
  beforeEach(() => {
    render(<App />)
  })

  afterAll(() => {
    cleanup()
    jest.clearAllMocks()
  })

  it('displays the title to the user', () => {
    expect(screen.getByText('Weather App')).toBeDefined()
  })

  it('displays the history to the user', () => {
    expect(screen.getByText('Previous searches')).toBeDefined()
  })

  it('displays the searchbar to the user', () => {
    expect(screen.getByLabelText('City name')).toBeDefined()
  })

  describe('when a user does a search that returns results', () => {
    beforeEach(() => {
      const today = DateTime.now().toSeconds()

      forecastUtils.getFullForecast = jest.fn().mockResolvedValue({
        list: [
          {
            dt: today,
            main: { temp: 12.5 }
          }
        ]
      })

      forecastUtils.getSingleDayForecast = () => ([{
        dt: today,
        main: { temp: 12.5 }
      }])
    })

    it('it displays them on the page', async() => {
      const input = screen.getByLabelText('City name')

      fireEvent.change(input, { target: { value: 'Liverpool' } })
      fireEvent.click(screen.getByText('Search'))

      expect(await screen.findByText('The forecast for Liverpool')).toBeDefined()
      expect(await screen.findAllByText('13c')).toBeDefined()
    })
  })
})
