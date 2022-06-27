import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IKpi } from 'app/shared/model/kpi.model';
import { AccountService } from 'app/core';
import { KpiService } from './kpi.service';

@Component({
  selector: 'jhi-kpi',
  templateUrl: './kpi.component.html'
})
export class KpiComponent implements OnInit, OnDestroy {
  kpis: IKpi[];
  currentAccount: any;
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected kpiService: KpiService,
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
      this.kpiService
        .search({
          query: this.currentSearch
        })
        .pipe(
          filter((res: HttpResponse<IKpi[]>) => res.ok),
          map((res: HttpResponse<IKpi[]>) => res.body)
        )
        .subscribe((res: IKpi[]) => (this.kpis = res), (res: HttpErrorResponse) => this.onError(res.message));
      return;
    }
    this.kpiService
      .query()
      .pipe(
        filter((res: HttpResponse<IKpi[]>) => res.ok),
        map((res: HttpResponse<IKpi[]>) => res.body)
      )
      .subscribe(
        (res: IKpi[]) => {
          this.kpis = res;
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
    this.registerChangeInKpis();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IKpi) {
    return item.id;
  }

  registerChangeInKpis() {
    this.eventSubscriber = this.eventManager.subscribe('kpiListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
