import { NodeWithI18n } from '@angular/compiler';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { HarvestDataService } from 'src/app/harvest-data.service';
import { ReceivedMeteoData } from 'src/app/model/input-output-data-models';
import { dailyRow } from '../../model/data-grid';
import { InputAreaComponent } from '../input-area/input-area.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-output-area',
  templateUrl: './output-area.component.html',
  styleUrls: ['./output-area.component.css']
})
export class OutputAreaComponent implements OnInit {
  data: dailyRow[];
  page = 1;
  pageSize = 10;
  selectedCity: string;
  columnsToDisplay = ['date', 'feel', 'forecast', 'tmin', 'tmax', 'ntmin', 'ntmax'];
  dataSource = new MatTableDataSource<dailyRow>(null);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public harvestDataService: HarvestDataService
  ) {
   }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.harvestDataService.meteoDataReceived$
    .pipe()
    .subscribe(this.onMeteoDataReceived.bind(this));
  }

  onMeteoDataReceived(newData: dailyRow[]) {
    // this.data = newData;

    this.dataSource = new MatTableDataSource<dailyRow>(newData);
    this.selectedCity = this.harvestDataService?.config?.city;

    console.log('Output Area: newData received: ' + newData);
  }
}
