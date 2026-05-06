export interface Ranking {
  activities: string[]
}

export interface GetRankingQuery {
  getRanking: Ranking | null
}

export interface GetRankingVariables {
  longitude: number
  latitude: number
}
