import { cleanup, render, screen } from '@testing-library/react'

import ForecastDisplay from './ForecastDisplay'

describe('ForecastDisplay', () => {
  afterAll(cleanup)

  describe('when there is no forecast', () => {
    beforeEach(() => {
      render(<ForecastDisplay forecast={null} title='test title' />)
    })
  
    it('returns nothing', () => {
      const display = screen.queryByText('test title')
      expect(display).toBeNull()
    })
  })
  
  describe('when the forecast contains no data', () => {
    beforeEach(() => {
      render(<ForecastDisplay forecast={[]} title='test title' />)
    })
  
    it('displays the title', () => {
      expect(screen.getByText('test title')).toBeDefined()
    })

    it('displays an alert to the user', () => {
    expect(screen.getByRole('alert')).toBeDefined()
  })
  })
 
  describe('when there is a forecast', () => {
    beforeEach(() => {
      const testForecast = [
        {
          dt: 1620814987,
          main: {
            temp: 16.7
          }
        },
        {
          dt: 1620614987,
          main: {
            temp: 12.2
          }
        }
      ]

      render(<ForecastDisplay forecast={testForecast} title='test title' />)
    })
  
    it('displays the title', () => {
      expect(screen.getByText('test title')).toBeDefined()
    })

    it('displays the temperatures rounded to a whole number', () => {
      expect(screen.getByText('17c')).toBeDefined()
      expect(screen.getByText('12c')).toBeDefined()
    })
    
    it('displays the times rounded to a whole number', () => {
      expect(screen.getByText('11:23')).toBeDefined()
      expect(screen.getByText('03:49')).toBeDefined()
    })
  })
})
