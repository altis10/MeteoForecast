import { Component } from '@angular/core';
import { HarvestDataService } from './harvest-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'MeteoForecast';

  constructor(
    public harvestDataService: HarvestDataService
  ) {}

  ngOnInit() {

  }
}
