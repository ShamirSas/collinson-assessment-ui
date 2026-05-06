import { gql } from '@apollo/client'

export const GET_RANKING_QUERY = gql`
  query GetRanking($longitude: Float!, $latitude: Float!) {
    getRanking(longitude: $longitude, latitude: $latitude) {
      activities
    }
  }
`
