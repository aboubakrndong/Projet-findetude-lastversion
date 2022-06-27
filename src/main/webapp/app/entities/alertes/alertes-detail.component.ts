import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAlertes } from 'app/shared/model/alertes.model';

@Component({
  selector: 'jhi-alertes-detail',
  templateUrl: './alertes-detail.component.html'
})
export class AlertesDetailComponent implements OnInit {
  alertes: IAlertes;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ alertes }) => {
      this.alertes = alertes;
    });
  }

  previousState() {
    window.history.back();
  }
}
