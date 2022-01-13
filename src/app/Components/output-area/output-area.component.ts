import { NodeWithI18n } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { row } from '../../model/data-grid';
import { InputAreaComponent } from '../input-area/input-area.component';

@Component({
  selector: 'app-output-area',
  templateUrl: './output-area.component.html',
  styleUrls: ['./output-area.component.css']
})
export class OutputAreaComponent implements OnInit {
  mockupdata: row[];
  page = 1;
  pageSize = 10;
  selectedCity: string;

  constructor(
    public inputAreaComp: InputAreaComponent
  ) { }

  ngOnInit(): void {
    this.selectedCity = this.inputAreaComp?.selectedCity?.name;
    this.mockupdata = [
      {
        date: Date.now().toString(),
        tmin: '10',
        tmax: '20',
        ntmin: '30',
        ntmax: '40'
      },
      {
        date: Date.now().toString(),
        tmin: '11',
        tmax: '21',
        ntmin: '31',
        ntmax: '41'
      },
      {
        date: Date.now().toString(),
        tmin: '12',
        tmax: '22',
        ntmin: '32',
        ntmax: '42'
      },
      {
        date: Date.now().toString(),
        tmin: '13',
        tmax: '23',
        ntmin: '33',
        ntmax: '43'
      },
      {
        date: Date.now().toString(),
        tmin: '14',
        tmax: '24',
        ntmin: '34',
        ntmax: '44'
      },
      {
        date: Date.now().toString(),
        tmin: '15',
        tmax: '25',
        ntmin: '35',
        ntmax: '45'
      },
      {
        date: Date.now().toString(),
        tmin: '16',
        tmax: '26',
        ntmin: '36',
        ntmax: '46'
      },
      {
        date: Date.now().toString(),
        tmin: '17',
        tmax: '27',
        ntmin: '37',
        ntmax: '47'
      },
      {
        date: Date.now().toString(),
        tmin: '18',
        tmax: '28',
        ntmin: '38',
        ntmax: '48'
      },
      {
        date: Date.now().toString(),
        tmin: '19',
        tmax: '29',
        ntmin: '39',
        ntmax: '49'
      },
      {
        date: Date.now().toString(),
        tmin: '110',
        tmax: '210',
        ntmin: '310',
        ntmax: '410'
      },
      {
        date: Date.now().toString(),
        tmin: '111',
        tmax: '211',
        ntmin: '311',
        ntmax: '411'
      }
    ]
  }

}
