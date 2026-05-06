export interface Location {
  id: string
  name: string
  country: string
  country_code: string
  admin1: string
  latitude: number
  longitude: number
  timezone: string
}

export interface LocationsPayload {
  __typename: 'Locations'
  locations: Location[]
}

export interface ResponseMessagePayload {
  __typename: 'ResponseMessage'
  message: string
}

export type LocationsSearchResponse = LocationsPayload | ResponseMessagePayload | null

export interface GetLocationsQuery {
  getLocations: LocationsSearchResponse
}

export interface GetLocationsVariables {
  name: string
}
