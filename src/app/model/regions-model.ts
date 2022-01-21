export interface region {
  name: string,
  subRegions: string[]
}

export interface subRegion {
  name: string,
  cities: string[]
}

export interface city {
  name: string
}
