import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITechnicien } from 'app/shared/model/technicien.model';
import { AccountService } from 'app/core';
import { TechnicienService } from './technicien.service';

@Component({
  selector: 'jhi-technicien',
  templateUrl: './technicien.component.html'
})
export class TechnicienComponent implements OnInit, OnDestroy {
  techniciens: ITechnicien[];
  currentAccount: any;
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected technicienService: TechnicienService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected activatedRoute: ActivatedRoute,
    protected accountService: AccountService
  ) {
    this.currentSearch =
      this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search'] ? this.activatedRoute.snapshot.params['search'] : '';
  }

  loadAll() {
    if (this.currentSearch) {
      this.technicienService
        .search({
          query: this.currentSearch
        })
        .pipe(
          filter((res: HttpResponse<ITechnicien[]>) => res.ok),
          map((res: HttpResponse<ITechnicien[]>) => res.body)
        )
        .subscribe((res: ITechnicien[]) => (this.techniciens = res), (res: HttpErrorResponse) => this.onError(res.message));
      return;
    }
    this.technicienService
      .query()
      .pipe(
        filter((res: HttpResponse<ITechnicien[]>) => res.ok),
        map((res: HttpResponse<ITechnicien[]>) => res.body)
      )
      .subscribe(
        (res: ITechnicien[]) => {
          this.techniciens = res;
          this.currentSearch = '';
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  search(query) {
    if (!query) {
      return this.clear();
    }
    this.currentSearch = query;
    this.loadAll();
  }

  clear() {
    this.currentSearch = '';
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInTechniciens();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ITechnicien) {
    return item.id;
  }

  registerChangeInTechniciens() {
    this.eventSubscriber = this.eventManager.subscribe('technicienListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
