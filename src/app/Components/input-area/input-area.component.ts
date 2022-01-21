import { Component, OnInit, OnChanges, OnDestroy, ViewChild } from '@angular/core';
import { subRegion, city, region } from '../../model/regions-model';
import { HarvestDataService } from 'src/app/harvest-data.service';
import { ReceivedMeteoData } from 'src/app/model/input-output-data-models';
import { concatMap, map, mergeMap } from 'rxjs/operators';
import { GeneralConfigAreaComponent } from '../general-config-area/general-config-area.component';
import { untilDestroyed } from '@ngneat/until-destroy';
import { row } from 'src/app/model/data-grid';

@Component({
  selector: 'app-input-area',
  templateUrl: './input-area.component.html',
  styleUrls: ['./input-area.component.css']
})
export class InputAreaComponent implements OnInit {
  separator = ' : ';
  serverAddress: string;
  regions: string[];
  selectedRegionName: string;
  selectedSubRegion: string;
  public selectedCity: string;
  selectedSubRegions: string[];
  selectedCities: string[];
  selectedPath: string;
  inputAreaBckgdPicture: string;
  initialRegion: region;
  initialSubRegion: subRegion;
  initialCity: city;

  @ViewChild(GeneralConfigAreaComponent, { static: true }) generalConfigAreaComp: GeneralConfigAreaComponent;
  constructor(
    private harvestDataService: HarvestDataService,
    // private generalConfigArea: GeneralConfigAreaComponent
  )
  {
  }

  ngOnInit(): void {
    this.harvestDataService.initializationDone$
    .pipe()
    .subscribe(this.onInitializationDone.bind(this));

    this.harvestDataService.meteoDataReceived$
    .pipe()
    .subscribe(this.onMeteoDataReceived.bind(this))
  }

  onInitializationDone(data: ReceivedMeteoData) {
    this.serverAddress = this.harvestDataService?.config?.serverAddress;
    this.regions = this.harvestDataService.config.regions;
    this.inputAreaBckgdPicture = "../../Meteo/winter-sun.webp";
    this.selectedRegionName = this.harvestDataService?.config?.region;
    this.selectedSubRegions = this.harvestDataService?.config?.subregions;
    this.selectedSubRegion = this.harvestDataService?.config?.subregion;
    this.selectedCities = this.harvestDataService?.config?.cities;
    this.selectedCity = this.harvestDataService?.config?.city;
    console.log('Input Area: Initialization done: Selected subregion: ' + this.selectedSubRegion);
    console.log('----------------');
    console.log(this.selectedSubRegions);
    this.harvestDataService.harvestData( this.harvestDataService.createMeteoRequest(this.harvestDataService.config.region, this.selectedSubRegion, this.selectedCity, 0, 1))
    .pipe()
    .subscribe((result) => {
      this.harvestDataService.harvestedData = result;
      this.harvestDataService.meteoDataReceived$.next(this.harvestDataService.meteoData);
      console.log('onInitializationDone selectedCity: ' + this.selectedCity);
    });
  }

  onMeteoDataReceived(newData: row[]) {
    this.selectedCity = this.harvestDataService?.config?.city;

    console.log('Output Area: newData received: ' + newData);
  }

  ngOnDestroy() {
    // To protect you, we'll throw an error if it doesn't exist.
  }

  onChangeRegion( event: any): void {
    this.selectedRegionName = this.regions[event.target.selectedIndex];
    this.harvestDataService.config.region = this.selectedRegionName;
    this.harvestDataService.harvestData( this.harvestDataService.createGeoRequest(this.harvestDataService.config.region, null, null))
    .pipe(
      concatMap((subRegResponse) => {
        if(subRegResponse!.length > 0) {
          this.harvestDataService.config.subregions = subRegResponse;
          this.harvestDataService.config.subregion = subRegResponse[0];
          this.selectedSubRegion = subRegResponse[0];
          return this.harvestDataService.harvestData( this.harvestDataService.createGeoRequest(this.harvestDataService.config.region, this.harvestDataService.config.subregion, null));
        }
      }),
      concatMap((cityResponse) => {
        if(cityResponse!.length > 0) {
          this.harvestDataService.config.cities = cityResponse;
          this.harvestDataService.config.city = cityResponse[0];
          this.selectedCity = cityResponse[0];
          return this.harvestDataService.harvestData( this.harvestDataService
            .createMeteoRequest(this.harvestDataService.config.region, this.harvestDataService.config.subregion, this.harvestDataService.config.city, 0, 1))
        }
      }),
      map((meteoResponse) => {
        return meteoResponse;
      })
    )
    .subscribe((result) => {
      this.harvestDataService.harvestedData = result;
      this.harvestDataService.meteoData = this.harvestDataService.parseMeteoData(result);
      this.harvestDataService.meteoDataReceived$.next(this.harvestDataService.meteoData);
      console.log('onChangeRegion: selectedCities= ' + this.selectedCities);
      console.log('onChangeRegion: selectedCity= ' + this.selectedCity);
    });
  }

  onChangeSubRegion( event: any): void {
    this.selectedSubRegion = this.selectedSubRegions[event.target.selectedIndex];
    this.harvestDataService.config.subregion = this.selectedSubRegion;
    this.harvestDataService.harvestData( this.harvestDataService.createGeoRequest( this.harvestDataService.config.region, this.selectedSubRegion, null))
    .pipe(
      concatMap((result) => {
        this.selectedCities = result;
        this.selectedCity = this.selectedCities[0];
        this.harvestDataService.config.cities = result;
        this.harvestDataService.config.city = this.selectedCities[0];
        this.harvestDataService.harvestedData.Data = [];
        return this.harvestDataService.harvestData( this.harvestDataService
          .createMeteoRequest(this.harvestDataService.config.region, this.selectedSubRegion, this.selectedCity, 0, 1))
        }),
        map((meteoResponse) => {
          return meteoResponse;
        })
      )
      .subscribe((result) => {
        this.harvestDataService.harvestedData = result;
        this.harvestDataService.meteoData = this.harvestDataService.parseMeteoData(result);
        this.harvestDataService.meteoDataReceived$.next(this.harvestDataService.meteoData);
        console.log('onChangeSubRegion: selectedCities= ' + this.selectedCities);
        console.log('onChangeSubRegion: selectedCity= ' + this.selectedCity);
      });
  }

  onChangeCity( event: any): void {
    this.selectedCity = this.selectedCities[event.target.selectedIndex];
    this.harvestDataService.harvestData( this.harvestDataService.createMeteoRequest(this.harvestDataService.config.region, this.selectedSubRegion, this.selectedCity, 0, 1))
    .pipe()
    .subscribe((result) => {
      this.harvestDataService.harvestedData = result;
      this.harvestDataService.meteoData = this.harvestDataService.parseMeteoData(result);
      this.harvestDataService.meteoDataReceived$.next(this.harvestDataService.meteoData);
      console.log('Input Area selectedCity' + this.selectedCity);
    });
  }
}
