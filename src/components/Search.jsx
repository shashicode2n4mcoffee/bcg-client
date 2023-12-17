import React from 'react'
import '../styles/Search.css'

const Search = ({ searchTerm, setSearchTerm, handleSearch }) => {
  return (
    <div className='search-container'>
      <label htmlFor='searchInput' className='search-label'>
        Search by Applicant ID:{' '}
      </label>
      <input
        type='text'
        id='searchInput'
        value={searchTerm}
        className='search-input'
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  )
}

export default Search
