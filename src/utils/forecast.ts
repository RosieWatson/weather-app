import { DateTime } from 'luxon'

// Better off in an env file or similar
const WEATHER_API_KEY = 'fd85fabcca62ac65613b18280c85fa56'

export const getFullForecast = async (searchCity: string) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${searchCity},UK&mode=json&units=metric&appid=${WEATHER_API_KEY}`
  )

  return response.json()
}

export const getSingleDayForecast = (fullForecast: { list: Array<any> }, daysFromToday: number) => {
  const dayToBeAfter = DateTime.local().plus({ days: (daysFromToday - 1) })
  const dayToGet = DateTime.local().plus({ days: daysFromToday })

  const forecast = fullForecast.list.filter((data: any) => {
    const forecastDay = DateTime.fromSeconds(data.dt)

    if (daysFromToday === 0) {
      return forecastDay.startOf('day') <= dayToGet.startOf('day')
    }

    return (forecastDay.startOf('day') <= dayToGet.startOf('day')) && !(forecastDay.startOf('day') <= dayToBeAfter.startOf('day'))
  })

  return forecast
}
