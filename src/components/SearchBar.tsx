import React, { useState } from 'react'

interface SearchBarProps {
  searchAction: (param: string) => void
}

const SearchBar = ({ searchAction }: SearchBarProps) => {
  const [cityName, setCityName] = useState('')

  const onSearch = () => {
    searchAction(cityName)
  }
 
  return (
    <div className="input-group p-4 w-50 align-self-center">
      <input
        value={cityName}
        onInput={event => setCityName(event.currentTarget.value)}
        type="text"
        className="form-control"
        placeholder="City name"
        aria-label="City name"
      />
      <div className="input-group-append">
        <button
          onClick={onSearch}
          className="btn btn-outline-secondary"
          type="button"
        >
          Search
        </button>
      </div>
    </div>
  )
}

export default SearchBar
