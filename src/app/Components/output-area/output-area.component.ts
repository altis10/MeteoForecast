import { NodeWithI18n } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HarvestDataService } from 'src/app/harvest-data.service';
import { ReceivedMeteoData } from 'src/app/model/input-output-data-models';
import { row } from '../../model/data-grid';
import { InputAreaComponent } from '../input-area/input-area.component';

@Component({
  selector: 'app-output-area',
  templateUrl: './output-area.component.html',
  styleUrls: ['./output-area.component.css']
})
export class OutputAreaComponent implements OnInit {
  data: row[];
  page = 1;
  pageSize = 10;
  selectedCity: string;

  @ViewChild(InputAreaComponent, { static: true }) inputAreaComp: InputAreaComponent;
  constructor(
    public harvestDataService: HarvestDataService
  ) {
}

  ngOnInit(): void {
    this.harvestDataService.meteoDataReceived$
    .pipe()
    .subscribe(this.onMeteoDataReceived.bind(this));
  }

  onMeteoDataReceived(newData: row[]) {
    this.data = newData;
    this.selectedCity = this.harvestDataService?.config?.city;

    console.log('Output Area: newData received: ' + newData);
  }
}
