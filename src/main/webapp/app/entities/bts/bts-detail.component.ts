import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBts } from 'app/shared/model/bts.model';

@Component({
  selector: 'jhi-bts-detail',
  templateUrl: './bts-detail.component.html'
})
export class BtsDetailComponent implements OnInit {
  bts: IBts;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ bts }) => {
      this.bts = bts;
    });
  }

  previousState() {
    window.history.back();
  }
}
