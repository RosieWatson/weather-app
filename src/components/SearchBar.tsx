import React from 'react'

const SearchBar = () => {
  return (
    <div className="input-group mb-3 p-4">
      <input type="text" className="form-control" placeholder="City name" aria-label="City name"/>
      <div className="input-group-append">
        <button className="btn btn-outline-secondary" type="button">Search</button>
      </div>
    </div>
  )
}

export default SearchBar
