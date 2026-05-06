import { Location, LocationsSearchResponse } from '../types/locationSearch'

interface LocationSearchResultsProps {
  hasSearched: boolean
  isLoading: boolean
  error?: { message?: string } | null
  response: LocationsSearchResponse
  onSelectLocation: (location: Location) => void
  isDisabled?: boolean
}

function getCountryFlag(countryCode: string): string {
  const normalizedCode = countryCode?.trim().toUpperCase()
  if (!normalizedCode || normalizedCode.length !== 2) {
    return '🌍'
  }

  const firstLetter = normalizedCode.codePointAt(0)
  const secondLetter = normalizedCode.codePointAt(1)
  if (!firstLetter || !secondLetter) {
    return '🌍'
  }

  const flagOffset = 127397
  return String.fromCodePoint(firstLetter + flagOffset, secondLetter + flagOffset)
}

function LocationSearchResults({
  hasSearched,
  isLoading,
  error,
  response,
  onSelectLocation,
  isDisabled = false,
}: LocationSearchResultsProps) {
  if (!hasSearched) {
    return <div className="alert alert-secondary mb-0">Search for a city or town to begin.</div>
  }

  if (isLoading) {
    return (
      <div className="d-flex align-items-center gap-2 text-body-secondary">
        <div className="spinner-border spinner-border-sm" role="status" />
        <span>Loading results...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="alert alert-danger mb-0">
        Failed to load locations. {error.message ?? 'Please try again.'}
      </div>
    )
  }

  if (!response) {
    return <div className="alert alert-warning mb-0">No response from the server.</div>
  }

  if (response.__typename === 'ResponseMessage') {
    return <div className="alert alert-warning mb-0">{response.message}</div>
  }

  return (
    <ul className="list-group">
      {response.locations.map((location) => (
        <li key={location.id} className="list-group-item p-0">
          <button
            type="button"
            className="location-result-button btn btn-link text-start text-decoration-none w-100 py-3 px-3"
            onClick={() => onSelectLocation(location)}
            disabled={isDisabled}
          >
            <div className="d-flex justify-content-between flex-wrap gap-2 text-body">
            <div>
              <h2 className="h6 mb-1">
                {location.name}, {getCountryFlag(location.country_code)} {location.country}
              </h2>
              <p className="mb-0 text-body-secondary">{location.admin1}</p>
            </div>
            <div className="text-md-end">
              <small className="d-block">Lat: {location.latitude}</small>
              <small className="d-block">Long: {location.longitude}</small>
              <small className="d-block text-body-secondary">{location.timezone}</small>
            </div>
            </div>
          </button>
        </li>
      ))}
    </ul>
  )
}

export default LocationSearchResults
