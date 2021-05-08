import React from 'react'

interface HistoryDisplayProps {
  history: Array<string> 
  searchAction: (param: string, isNewSearch: boolean) => void
}

const HistoryDisplay = ({ history, searchAction }: HistoryDisplayProps) => {
  return (
    <div className="d-flex flex-column mt-4">
      <h4>Previous searches</h4>
      <p>Click to re-search!</p>
      {history.map((city, index) => (
        <button
          onClick={() => searchAction(city, false)}
          className="btn btn-sm btn-outline-secondary mb-2"
          type="button"
          key={index}>
          {city}
        </button>
      ))}
    </div>
  )
}

export default HistoryDisplay
