import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { HarvestDataService } from 'src/app/harvest-data.service';
import { dailyRow } from '../../model/data-grid';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-output-area',
  templateUrl: './output-area.component.html',
  styleUrls: ['./output-area.component.css']
})
export class OutputAreaComponent implements OnInit, AfterViewInit {
  data: dailyRow[];
  dataSource: MatTableDataSource<dailyRow>;
  page = 1;
  pageSize = 10;
  selectedCity: string;
  columnsToDisplay = ['date', 'feel', 'forecast', 'tmin', 'tmax', 'ntmin', 'ntmax'];

  @ViewChild('paginator') paginator: MatPaginator;

  constructor(
    private cdr: ChangeDetectorRef,
    private harvestDataService: HarvestDataService
  ) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<dailyRow>([]);
    this.dataSource.paginator = this.paginator;

    this.harvestDataService.meteoDataReceived$
    .pipe()
    .subscribe(this.onMeteoDataReceived.bind(this));
  }

  onMeteoDataReceived(newData: dailyRow[]) {
    this.dataSource = new MatTableDataSource<dailyRow>(newData);

    this.selectedCity = this.harvestDataService?.config?.city;
    this.dataSource.paginator = this.paginator;

    console.log('Output Area: newData received: ' + newData);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}
