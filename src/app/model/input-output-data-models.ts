import { dayData, dailyRow } from "./data-grid";
import { city, region, subRegion } from "./regions-model";

export class InputConfigData {
  serverAddress: string;
  regions: string[];
  region: string;
  subregions: string[];
  subregion: string;
  cities: string[];
  city: string;
  skip: number;
  take: number;
  meteoRequest: string;
  geoRequest: string;
}

export interface ReceivedMeteoData {
  GridCoordinates: {
    R: number,
    C: number
  },
  CalendarRange: {
    start: string,
    end: string,
    length: number
  },
  Data: dayData[]
}
