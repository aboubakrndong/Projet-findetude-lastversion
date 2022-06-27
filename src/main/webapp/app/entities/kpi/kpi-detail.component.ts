import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IKpi } from 'app/shared/model/kpi.model';

@Component({
  selector: 'jhi-kpi-detail',
  templateUrl: './kpi-detail.component.html'
})
export class KpiDetailComponent implements OnInit {
  kpi: IKpi;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ kpi }) => {
      this.kpi = kpi;
    });
  }

  previousState() {
    window.history.back();
  }
}
