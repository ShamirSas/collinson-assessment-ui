import { FormEvent, useState } from 'react'

interface LocationSearchFormProps {
  onSearch: (value: string) => void
  isLoading: boolean
}

function LocationSearchForm({ onSearch, isLoading }: LocationSearchFormProps) {
  const [searchValue, setSearchValue] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const trimmedValue = searchValue.trim()
    if (!trimmedValue) {
      return
    }

    onSearch(trimmedValue)
  }

  return (
    <form onSubmit={handleSubmit} className="row g-2 align-items-end mb-4">
      <div className="col-12 col-md">
        <label htmlFor="location-search-input" className="form-label">
          City or town
        </label>
        <input
          id="location-search-input"
          type="text"
          className="form-control"
          placeholder="e.g. London, Cape Town, Paris"
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          disabled={isLoading}
        />
      </div>

      <div className="col-12 col-md-auto">
        <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </div>
    </form>
  )
}

export default LocationSearchForm
