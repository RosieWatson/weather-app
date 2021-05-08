import { DateTime }  from 'luxon'

interface ForecastDisplayInterface {
  forecast: Array<any> | null
  title: string
}

const ForecastDisplay = ({ forecast, title }:ForecastDisplayInterface) => {
  if (!forecast) return null

  return ( 
    <div>
      <h4 className='my-4'>{title}</h4>
      <div className='d-flex justify-content-center flex-wrap'>
        {(forecast.length === 0) && (
          <div className='alert alert-info w-50' role='alert'>
            Sorry, there is no data for today!
          </div>
        )}
        {forecast.map((dataPoint) => {
          return (
            <div className='card bg-light mb-3 mx-2' key={dataPoint.dt}>
              <div className='card-body text-dark'>
                <h5 className='card-text'>{Math.round(dataPoint.main.temp)}c</h5>
              </div>
              <div className='card-footer bg-transparent bg-light'>{DateTime.fromSeconds(dataPoint.dt).toLocaleString(DateTime.TIME_SIMPLE)}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ForecastDisplay
