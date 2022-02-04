import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import { HarvestDataService } from 'src/app/harvest-data.service';
import { InputConfigData, ReceivedMeteoData } from 'src/app/model/input-output-data-models';

@Component({
  selector: 'app-general-config-area',
  templateUrl: './general-config-area.component.html',
  styleUrls: ['./general-config-area.component.css']
})
export class GeneralConfigAreaComponent implements OnInit {
  serverAddress: string;
  public addressChanged$ = new Subject();

  constructor(
    private harvestDataService: HarvestDataService
  ) { }

  ngOnInit(): void {
  }

  onServerAddressChange( event: any) {
    this.serverAddress = event.target.value;
    this.harvestDataService.initializeLocation(this.serverAddress);
  }

  onRefreshBtnClicked() {
    this.harvestDataService.initializeLocation(this.serverAddress);
  }
}
