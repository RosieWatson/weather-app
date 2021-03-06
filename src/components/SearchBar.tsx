import { useState } from 'react'

interface SearchBarProps {
  searchAction: (param: string, isNewSearch: boolean) => void
}

const SearchBar = ({ searchAction }: SearchBarProps) => {
  const [cityName, setCityName] = useState('')

  const onSearch = () => {
    searchAction(cityName, true)
  }
 
  return (
    <div className='input-group px-5 my-3 mx-5 align-self-center'>
      <input
        value={cityName}
        onChange={event => setCityName(event.target.value)}
        type='text'
        className='form-control'
        placeholder='City name (e.g. London)'
        aria-label='City name'
      />
      <div className='input-group-append'>
        <button
          onClick={onSearch}
          className='btn btn-secondary'
          type='button'
        >
          Search
        </button>
      </div>
    </div>
  )
}

export default SearchBar
