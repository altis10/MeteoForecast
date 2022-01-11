import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { subRegion, city, region } from '../../model/regions-mockup';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-area',
  templateUrl: './input-area.component.html',
  styleUrls: ['./input-area.component.css']
})
export class InputAreaComponent implements OnInit {
  romaniaReg: subRegion;
  moldovaReg: subRegion;
  europaReg: region;
  suaReg: subRegion;
  canadaReg: subRegion;
  americaReg: region;
  regions: region[];
  selectedRegion: region;
  selectedSubRegion: subRegion;
  selectedCity: city;
  selectedSubRegions: subRegion[];
  selectedCities: city[];
  // reg: any;

  constructor(
  ) { }

  ngOnInit(): void {
    this.initializeRegion();
    this.selectedRegion = this.regions[0];
    this.selectedSubRegions = this.selectedRegion.subRegions;
    this.selectedSubRegion = this.selectedSubRegions[0];
  }

  onChangeRegion( event: any): void {
    this.selectedSubRegions = this.regions[event.target.selectedIndex].subRegions;
    console.log(this.selectedSubRegions);
  }

  onChangeSubRegion( event: any): void {
    this.selectedCities = this.selectedSubRegions[event.target.selectedIndex].cities;
    console.log(this.selectedCities);
  }

  onChangeCity( event: any): void {
  }

  private initializeRegion(): void {
    this.romaniaReg = {
      name: "Romania",
      cities: [
        {
          name: "Bucuresti"
        },
        {
          name: "Cluj"
        },
        {
          name: "Iasi"
        },
        {
          name: "Suceava"
        }
      ]
    }

    this.moldovaReg = {
      name: "Moldova",
      cities: [
        {
          name: "Chisinau"
        },
        {
          name: "Balti"
        },
        {
          name: "Tiraspol"
        }
      ]
    }

    this.europaReg = {
      name: "Europa",
      subRegions: [this.romaniaReg, this.moldovaReg]
    }

    this.suaReg = {
      name: "SUA",
      cities: [
        {
          name: "New York"
        },
        {
          name: "Washington"
        },
        {
          name: "Seattle"
        },
        {
          name: "Dallas"
        }
      ]
    }

    this.canadaReg = {
      name: "Canada",
      cities: [
        {
          name: "Ottawa"
        },
        {
          name: "Motreal"
        },
        {
          name: "Vancouver"
        }
      ]
    }

    this.americaReg = {
      name: "America",
      subRegions: [this.suaReg, this.canadaReg]
    }

    this.regions = [this.europaReg, this.americaReg]
  }
}
