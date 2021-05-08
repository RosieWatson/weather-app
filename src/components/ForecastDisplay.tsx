import React from 'react'
import { DateTime }  from 'luxon'

interface ForecastDisplayInterface {
  forecast: Array<any> | null
  title: string
}

const ForecastDisplay = ({ forecast, title }:ForecastDisplayInterface) => {
  if (!forecast) return null

  return ( 
    <div>
      <h3>{title}</h3>
      <div className='d-flex justify-content-center'>
        {forecast.map((dataPoint) => {
          return (
            <div className="card bg-light mb-3" key={dataPoint.dt}>
              <div className="card-body text-dark">
                <p className="card-text">{Math.round(dataPoint.main.temp)}c</p>
              </div>
              <div className="card-footer bg-transparent bg-light">{DateTime.fromSeconds(dataPoint.dt).toLocaleString(DateTime.TIME_SIMPLE)}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ForecastDisplay
