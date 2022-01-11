export interface region {
  name: string,
  subRegions: subRegion[]
}

export interface subRegion {
  name: string,
  cities: city[]
}

export interface city {
  name: string
}
