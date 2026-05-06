import { gql } from '@apollo/client'

export const GET_LOCATIONS_QUERY = gql`
  query GetLocations($name: String!) {
    getLocations(name: $name) {
      __typename
      ... on Locations {
        locations {
          id
          name
          country
          country_code
          admin1
          latitude
          longitude
          timezone
        }
      }
      ... on ResponseMessage {
        message
      }
    }
  }
`
