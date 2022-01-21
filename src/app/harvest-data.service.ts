import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InputConfigData, ReceivedMeteoData } from './model/input-output-data-models';
import { region, subRegion, city } from '../app/model/regions-model';
import { Observable, of, Subject, throwError } from 'rxjs';
import { catchError, concatMap, map, mergeMap, retry } from 'rxjs/operators';
import { row } from './model/data-grid';

@Injectable({
  providedIn: 'root'
})
export class HarvestDataService {
  public config: InputConfigData;
  public currentConfig: InputConfigData;
  public harvestedData: ReceivedMeteoData;
  public meteoData: row[];
  public initializationDone$ = new Subject<row[]>();
  public meteoDataReceived$ = new Subject<row[]>();

  constructor(
    private httpClient: HttpClient
  ) {
    this.config = {
      serverAddress: '',
      regions: [],
      region: '',
      subregions: [],
      subregion:'',
      cities: [],
      city:'',
      geoRequest: '',
      meteoRequest: ''
    }
  }

  createMeteoRequest(region: string, subregion: string, city: string, skipValue: number, takeValue: number): string {

    this.config.meteoRequest = this.config.serverAddress
    + '/backend/meteo?region=' + region
    + '&subRegion=' + subregion
    + '&city=' + city
    + '&skip=' + skipValue
    + '&take=' + takeValue;

    this.config.region = region;
    this.config.subregion = subregion;
    this.config.city = city;

    return this.config.meteoRequest;
  }

  createGeoRequest(region: string, subregion: string, city: string): string {
    let geoRequest: string;

    if (!region || region === '') {
      throw new Error('No region specified!');
    } else if (!subregion || subregion === '') {
      geoRequest = this.config.serverAddress
      + '/backend/geography?region=' + region;
    } else if (!city || city === '') {
      geoRequest = this.config.serverAddress
      + '/backend/geography?region=' + region
      + '&subRegion=' + subregion;
    } else {
      geoRequest = this.config.serverAddress
      + 'backend/geography?region=' + region
      + '&subRegion=' + subregion
      + '&city=' + city;
    }
    this.config.geoRequest = geoRequest;

    return geoRequest;
  }

  harvestData(requestString: string): Observable<any> {
    return this.httpClient.get<any>( requestString);
  }

  initializeLocation( srvAddress: string, skipValue: number, takeValue: number): void {
    let meteoData: ReceivedMeteoData;
    this.config.serverAddress = srvAddress;
    const geographyKey = srvAddress + '/backend/geography?';
    const meteoKey = srvAddress + '/backend//meteo?';
    let searchMeteo: string;
    let searchGeo: string;

    this.harvestData(geographyKey)
    .pipe(
      concatMap((regResponse) => {
        if(regResponse!.length > 0) {
          this.config.regions = regResponse;
          this.config.region = regResponse[0];
          searchGeo = geographyKey + 'region=' + this.config.region;
          searchMeteo = meteoKey + 'region=' + this.config.region;
          return this.harvestData(searchGeo);
        }
      }),
      concatMap((subRegResponse) => {
        if(subRegResponse!.length > 0) {
          this.config.subregions = subRegResponse;
          this.config.subregion = subRegResponse[0];
          searchGeo = searchGeo + '&subRegion=' + this.config.subregion;
          searchMeteo = searchMeteo + '&subRegion=' + this.config.subregion;
          return this.harvestData(searchGeo);
        }
      }),
      concatMap((cityResponse) => {
        if(cityResponse!.length > 0) {
          this.config.cities = cityResponse;
          this.config.city = cityResponse[0];
          searchMeteo = searchMeteo + '&city=' + this.config.city + '&skip=' + skipValue + '&take=' + takeValue;
          this.config.geoRequest = searchGeo;
          this.config.meteoRequest = searchMeteo;
          return this.harvestData(searchMeteo);
        }
      }),
      map((meteoResponse) => {
        return meteoResponse;
      })
    ).subscribe(
      (rsp) => {
        this.harvestedData = {
          CalendarRange: rsp.CalendarRange,
          Data: rsp.Data,
          GridCoordinates: rsp.GridCoordinates
        };
        this.meteoData = this.parseMeteoData(this.harvestedData);
        console.log('Harvest service: Initialization done!');
        this.initializationDone$.next(this.meteoData);
      },
      (err) => {
        console.log(err.message);
        meteoData = null;
      },
      () => {

      }
    );
  }

  parseMeteoData( rawData: ReceivedMeteoData): row[] {
    let returnedData: row[] = new Array();

    var keys = Object.keys(rawData.Data);
    keys.forEach(key => {
      let addElement: row;

      addElement = {
        date: key,
        tmin: rawData.Data[key].TMinActual,
        tmax: rawData.Data[key].TMaxActual,
        ntmin: rawData.Data[key].TMinNormal,
        ntmax: rawData.Data[key].TMaxNormal,
        feel: rawData.Data[key].TempFeel,
        forecast: rawData.Data[key].Forecast
      };

      returnedData?.push(addElement);
    });

    return returnedData;
  }
}
