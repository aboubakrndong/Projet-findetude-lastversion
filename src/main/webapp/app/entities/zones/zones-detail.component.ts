import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IZones } from 'app/shared/model/zones.model';

@Component({
  selector: 'jhi-zones-detail',
  templateUrl: './zones-detail.component.html'
})
export class ZonesDetailComponent implements OnInit {
  zones: IZones;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ zones }) => {
      this.zones = zones;
    });
  }

  previousState() {
    window.history.back();
  }
}
