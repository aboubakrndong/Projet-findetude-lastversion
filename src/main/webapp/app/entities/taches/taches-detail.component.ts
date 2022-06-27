import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITaches } from 'app/shared/model/taches.model';

@Component({
  selector: 'jhi-taches-detail',
  templateUrl: './taches-detail.component.html'
})
export class TachesDetailComponent implements OnInit {
  taches: ITaches;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ taches }) => {
      this.taches = taches;
    });
  }

  previousState() {
    window.history.back();
  }
}
