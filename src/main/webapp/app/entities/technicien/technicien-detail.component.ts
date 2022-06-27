import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITechnicien } from 'app/shared/model/technicien.model';

@Component({
  selector: 'jhi-technicien-detail',
  templateUrl: './technicien-detail.component.html'
})
export class TechnicienDetailComponent implements OnInit {
  technicien: ITechnicien;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ technicien }) => {
      this.technicien = technicien;
    });
  }

  previousState() {
    window.history.back();
  }
}
