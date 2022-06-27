import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { MatTableDataSource } from '@angular/material';
import { ZonesService } from 'app/entities/zones';
import { IZones } from 'app/shared/model/zones.model';
import { IQos } from 'app/shared/model/qos.model';
import { IKpi } from 'app/shared/model/kpi.model';
import { IBts } from 'app/shared/model/bts.model';

export interface PeriodicElement {
  id?: number;
  nomzone?: string;
  couverture?: string;
  cadastre?: string;
  population?: string;
  qos?: IQos[];
  kpis?: IKpi[];
  bts?: IBts[];
}

@Component({
  selector: 'jhi-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent {
  listzone: IZones[];
  ELEMENT_DATA: PeriodicElement[];
  zone: IZones;
  selectedValue: number;
  displayedColumns: string[] = ['nomzone', 'couverture', 'cadastre', 'population'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  opened = false;

  constructor(private breakpointObserver: BreakpointObserver, private zoneService: ZonesService) {}

  ngOnInit(): void {
    this.listzone = new Array<IZones>();
    this.zoneService.findAll().subscribe(liste => {
      console.log(liste.body);
      this.listzone = liste.body;
    });
  }
  getZoneById(event: any) {
    this.zoneService.find(this.selectedValue).subscribe(zone => {
      console.log(zone);
      this.zone = zone.body;
      this.ELEMENT_DATA = [
        {
          id: this.zone.id,
          nomzone: this.zone.nomzone,
          couverture: this.zone.couverture,
          cadastre: this.zone.cadastre,
          population: this.zone.population,
          qos: this.zone.qos,
          kpis: this.zone.kpis,
          bts: this.zone.bts
        }
      ];
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
