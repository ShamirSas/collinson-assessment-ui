import { useState } from 'react'
import { useLazyQuery } from '@apollo/client/react'
import LocationRankingResults from './components/LocationRankingResults'
import LocationSearchForm from './components/LocationSearchForm'
import LocationSearchResults from './components/LocationSearchResults'
import { GET_LOCATIONS_QUERY } from './graphql/getLocations.query'
import { GET_RANKING_QUERY } from './graphql/getRanking.query'
import { GetRankingQuery, GetRankingVariables } from './types/ranking'
import { GetLocationsQuery, GetLocationsVariables, Location } from './types/locationSearch'
import './App.scss'

function App() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)

  const [searchLocations, { loading, data, error, called }] = useLazyQuery<
    GetLocationsQuery,
    GetLocationsVariables
  >(GET_LOCATIONS_QUERY, {
    fetchPolicy: 'no-cache',
  })

  const [loadRanking, { loading: isRankingLoading, data: rankingData, error: rankingError }] = useLazyQuery<
    GetRankingQuery,
    GetRankingVariables
  >(GET_RANKING_QUERY, {
    fetchPolicy: 'no-cache',
  })

  const handleSearch = (value: string) => {
    setSelectedLocation(null)
    void searchLocations({ variables: { name: value } })
  }

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location)
    void loadRanking({
      variables: {
        longitude: location.longitude,
        latitude: location.latitude,
      },
    })
  }

  return (
    <main className="container py-4 py-md-5">
      <div className="row justify-content-center">
        <div className="col-12 col-xl-10">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4 p-md-5">
              <h1 className="h3 mb-2">Location Search</h1>
              <p className="text-body-secondary mb-4">
                Search for a city or town using GraphQL.
              </p>

              <div className="d-lg-none">
                <LocationSearchForm onSearch={handleSearch} isLoading={loading || isRankingLoading} />

                {selectedLocation ? (
                  <LocationRankingResults
                    location={selectedLocation}
                    isLoading={isRankingLoading}
                    error={rankingError}
                    activities={rankingData?.getRanking?.activities ?? []}
                    onClearSelection={() => setSelectedLocation(null)}
                  />
                ) : (
                  <LocationSearchResults
                    hasSearched={called}
                    isLoading={loading}
                    error={error}
                    response={data?.getLocations ?? null}
                    onSelectLocation={handleLocationSelect}
                    isDisabled={isRankingLoading}
                  />
                )}
              </div>

              <div className="d-none d-lg-block">
                <div className="row g-4">
                  <div className="col-lg-6">
                    <div className="search-sticky">
                      <LocationSearchForm onSearch={handleSearch} isLoading={loading || isRankingLoading} />

                      <h2 className="h5 mb-3">Locations</h2>
                      <LocationSearchResults
                        hasSearched={called}
                        isLoading={loading}
                        error={error}
                        response={data?.getLocations ?? null}
                        onSelectLocation={handleLocationSelect}
                        isDisabled={isRankingLoading}
                      />
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="ranking-sticky">
                      <h2 className="h5 mb-3">Rankings</h2>
                      {selectedLocation ? (
                        <LocationRankingResults
                          location={selectedLocation}
                          isLoading={isRankingLoading}
                          error={rankingError}
                          activities={rankingData?.getRanking?.activities ?? []}
                          onClearSelection={() => setSelectedLocation(null)}
                          showBackButton={false}
                        />
                      ) : (
                        <div className="alert alert-secondary mb-0">
                          Select a location from the left to view ranking results.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
