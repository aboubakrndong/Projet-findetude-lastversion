import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IQos } from 'app/shared/model/qos.model';

@Component({
  selector: 'jhi-qos-detail',
  templateUrl: './qos-detail.component.html'
})
export class QosDetailComponent implements OnInit {
  qos: IQos;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ qos }) => {
      this.qos = qos;
    });
  }

  previousState() {
    window.history.back();
  }
}
