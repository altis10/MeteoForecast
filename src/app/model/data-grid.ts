export interface row {
  date: string,
  tmin: string,
  tmax: string,
  ntmin: string,
  ntmax: string,
  forecast: string,
  feel: string
}

export interface dayData {
  day: string,
  meteoData: {
    tmin: string,
    tmax: string,
    ntmin: string,
    ntmax: string,
    forecast: string,
    feel: string
  }
}
