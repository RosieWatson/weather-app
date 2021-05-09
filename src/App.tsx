import { useState } from 'react'

import { getFullForecast, getSingleDayForecast } from './utils/forecast'

import ErrorMessage from './components/ErrorMessage'
import HistoryDisplay from './components/HistoryDisplay'
import ForecastDisplay from './components/ForecastDisplay'
import SearchBar from './components/SearchBar'

const App = () =>  {
  const [cityHistory, setHistory] = useState<Array<any>>([])
  const [currentCity, setCurrentCity] = useState('')

  const [dayOneForecast, setDayOne] = useState<Array<any> | null>(null)
  const [dayTwoForecast, setDayTwo] = useState<Array<any> | null>(null)
  const [dayThreeForecast, setDayThree] = useState<Array<any> | null>(null)

  const [hasErrored, setErrored] = useState(false)

  const getForecast = async (cityName: string | null, newSearch: boolean) => {
    const searchCity = cityName || 'London'
    setCurrentCity(searchCity)

    try {
      const forecast = await getFullForecast(searchCity)

      const dayOneData = getSingleDayForecast(forecast, 0)
      setDayOne(dayOneData)

      const dayTwoData = getSingleDayForecast(forecast, 1)
      setDayTwo(dayTwoData)

      const dayThreeData = getSingleDayForecast(forecast, 2)
      setDayThree(dayThreeData)

      setErrored(false)
      if (newSearch && cityName) setHistory([cityName, ...cityHistory])
    } catch (error) {
      setErrored(true)

      console.log('Error calling weather API: ', error)
    }
  }
  
  return (
    <div className='container d-flex flex-wrap justify-content-center text-center pb-5'>
      <div className='d-flex flex-column w-75'>
        <h1 className='m-4'>Weather App</h1>
        <SearchBar searchAction={getForecast} />
        { hasErrored
          ? <ErrorMessage />
          : <>
              {currentCity.length > 0 && <h3>The forecast for {currentCity}</h3>}
              <ForecastDisplay forecast={dayOneForecast} title='Today' />
              <ForecastDisplay forecast={dayTwoForecast} title='Tomorrow' />
              <ForecastDisplay forecast={dayThreeForecast} title='The day after' />
            </>
          }
      </div>
      <HistoryDisplay history={cityHistory} searchAction={getForecast} />
    </div>
  )
}

export default App
