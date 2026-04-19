export type NationalityItem = {
  code: string
  country: string
  nationality: string
  flag_png: string | null
  flag_svg: string | null
  flag_alt: string | null
}

export type NationalitiesListResponse = {
  items: NationalityItem[]
  total: number
}
