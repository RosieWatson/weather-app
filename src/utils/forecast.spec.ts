import { DateTime } from 'luxon'

import { getFullForecast, getSingleDayForecast } from './forecast'

describe('forecast', () => {
  describe('getFullForecast', () => {
    beforeEach(() => {
      const mockSuccessResponse = {
        list: ['weather', 'data']
      }
      const mockJsonPromise = Promise.resolve(mockSuccessResponse)
      const mockFetchPromise = Promise.resolve({
        json: () => mockJsonPromise,
      })
      // @ts-expect-error
      jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise)
    })

    afterEach(() => jest.clearAllMocks())

    it('is called with the city name passed it', () => {
      getFullForecast('Liverpool')
      expect(global.fetch).toHaveBeenLastCalledWith('https://api.openweathermap.org/data/2.5/forecast?q=Liverpool,UK&mode=json&units=metric&appid=fd85fabcca62ac65613b18280c85fa56')
    })
  })

  describe('getSingleDayForecast', () => {
    const mockForecast = {
      list: [
        {
          dt: DateTime.now().toSeconds()
        },
        {
          dt: DateTime.now().plus({ days: 1 }).toSeconds()
        },
        {
          dt: DateTime.now().plus({ days: 1 }).toSeconds()
        },
        {
          dt: DateTime.now().plus({ days: 2 }).toSeconds()
        },
        {
          dt: DateTime.now().plus({ days: 2 }).toSeconds()
        },
        {
          dt: DateTime.now().plus({ days: 2 }).toSeconds()
        },
        {
          dt: DateTime.now().plus({ days: 3 }).toSeconds()
        },
      ]
    }

    describe('when fetching the data for today', () => {
      it('returns the items for today', () => {
        const testForecast = getSingleDayForecast(mockForecast, 0)

        expect(testForecast.length).toEqual(1)
      })
    })

    describe('when fetching the data for a day in the future', () => {
      it('returns the items for that day', () => {
        const testForecast = getSingleDayForecast(mockForecast, 2)

        expect(testForecast.length).toEqual(3)
      })
    })

    describe('when fetching the data for a day that we don\'t have', () => {
      it('returns an empty array', () => {
        const testForecast = getSingleDayForecast(mockForecast, 6)

        expect(testForecast.length).toEqual(0)
      })
    })
  })
})
