import React, { useState } from 'react'
import { DateTime }  from 'luxon'

import ErrorMessage from './components/ErrorMessage'
import HistoryDisplay from './components/HistoryDisplay'
import ForecastDisplay from './components/ForecastDisplay'
import SearchBar from './components/SearchBar'

import "./App.css"

const App = () =>  {
  const [cityHistory, setHistory] = useState([])
  const [currentCity, setCurrentCity] = useState('')

  const [dayOneForecast, setDayOne] = useState(null)
  const [dayTwoForecast, setDayTwo] = useState(null)
  const [dayThreeForecast, setDayThree] = useState(null)

  const [hasErrored, setErrored] = useState(false)

  const getForecast = async (cityName: string | null, newSearch: boolean) => {
    const searchCity = cityName || 'London'
    setCurrentCity(searchCity)

    try {
      // Would be better to have API key not stored directly in the fetch request
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${searchCity},UK&mode=json&units=metric&appid=fd85fabcca62ac65613b18280c85fa56`
      )
      const forecast = await response.json()

      const today = DateTime.local()
      const dayOneData = forecast.list.filter((data: any) => {
        const forecastDay = DateTime.fromSeconds(data.dt)
        return forecastDay.startOf("day") <= today.startOf("day")
      })
      setDayOne(dayOneData)
      
      const tomorrow = today.plus({ days: 1})
      const dayTwoData = forecast.list.filter((data: any) => {
        const forecastDay = DateTime.fromSeconds(data.dt)
        return (forecastDay.startOf("day") <= tomorrow.startOf("day")) && !(forecastDay.startOf("day") <= today.startOf("day"))
      })
      setDayTwo(dayTwoData)
      
      const dayAfterTomorrow = today.plus({ days: 2})
      const dayThreeData = forecast.list.filter((data: any) => {
        const forecastDay = DateTime.fromSeconds(data.dt)
        return (forecastDay.startOf("day") <= dayAfterTomorrow.startOf("day")) && !(forecastDay.startOf("day") <= tomorrow.startOf("day"))
      })
      setDayThree(dayThreeData)

      setErrored(false)
      // @ts-ignore
      if (newSearch && cityName) setHistory([cityName, ...cityHistory])
    } catch (error) {
      setErrored(true)

      console.log("Error calling weather API: ", error)
    }
  }
  
  return (
    <div className="App container d-flex flex-wrap justify-content-center pb-5">
      <div className="d-flex flex-column w-75">
        <h1 className='m-4'>Weather App</h1>
        <SearchBar searchAction={getForecast} />
        { hasErrored
          ? <ErrorMessage />
          : <>
              {currentCity.length > 0 && <h3>The forecast for {currentCity}</h3>}
              <ForecastDisplay forecast={dayOneForecast} title="Today" />
              <ForecastDisplay forecast={dayTwoForecast} title="Tomorrow" />
              <ForecastDisplay forecast={dayThreeForecast} title="The day after" />
            </>
          }
      </div>
      <HistoryDisplay history={cityHistory} searchAction={getForecast} />
    </div>
  )
}

export default App
