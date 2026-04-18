export type NationalityItem = {
  code: string
  country: string
  nationality: string
  flagPng: string | null
  flagSvg: string | null
  flagAlt: string | null
}

export type NationalitiesListResponse = {
  items: NationalityItem[]
  total: number
}
