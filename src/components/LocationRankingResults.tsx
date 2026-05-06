import { Location } from '../types/locationSearch'

interface LocationRankingResultsProps {
  location: Location
  isLoading: boolean
  error?: { message?: string } | null
  activities: string[]
  onClearSelection: () => void
  showBackButton?: boolean
}

const activityIconMap: Record<string, string> = {
  Skiing: '🎿',
  Surfing: '🏄',
  'Sightseeing Indoor': '🏛️',
  'Sightseeing Outdoors': '🌳',
}

function getActivityIcon(activity: string): string {
  return activityIconMap[activity] ?? '📍'
}

function LocationRankingResults({
  location,
  isLoading,
  error,
  activities,
  onClearSelection,
  showBackButton = true,
}: LocationRankingResultsProps) {
  return (
    <section>
      <div className="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-3">
        <div>
          <h2 className="h5 mb-1">
            Ranking for {location.name}, {location.country}
          </h2>
          <p className="text-body-secondary mb-0">{location.admin1}</p>
        </div>
        {showBackButton && (
          <button type="button" className="btn btn-outline-secondary btn-sm" onClick={onClearSelection}>
            Back to location results
          </button>
        )}
      </div>

      {isLoading && (
        <div className="d-flex align-items-center gap-2 text-body-secondary">
          <div className="spinner-border spinner-border-sm" role="status" />
          <span>Loading ranking...</span>
        </div>
      )}

      {!isLoading && error && (
        <div className="alert alert-danger mb-0">
          Failed to load ranking. {error.message ?? 'Please try again.'}
        </div>
      )}

      {!isLoading && !error && activities.length === 0 && (
        <div className="alert alert-warning mb-0">No ranking data was returned for this location.</div>
      )}

      {!isLoading && !error && activities.length > 0 && (
        <ol className="list-group list-group-numbered">
          {activities.map((activity) => (
            <li key={activity} className="list-group-item">
              <span className="me-2" aria-hidden="true">
                {getActivityIcon(activity)}
              </span>
              {activity}
            </li>
          ))}
        </ol>
      )}
    </section>
  )
}

export default LocationRankingResults
