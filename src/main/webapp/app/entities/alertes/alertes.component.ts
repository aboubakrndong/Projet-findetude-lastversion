import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAlertes } from 'app/shared/model/alertes.model';
import { AccountService } from 'app/core';
import { AlertesService } from './alertes.service';

@Component({
  selector: 'jhi-alertes',
  templateUrl: './alertes.component.html'
})
export class AlertesComponent implements OnInit, OnDestroy {
  alertes: IAlertes[];
  currentAccount: any;
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected alertesService: AlertesService,
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
      this.alertesService
        .search({
          query: this.currentSearch
        })
        .pipe(
          filter((res: HttpResponse<IAlertes[]>) => res.ok),
          map((res: HttpResponse<IAlertes[]>) => res.body)
        )
        .subscribe((res: IAlertes[]) => (this.alertes = res), (res: HttpErrorResponse) => this.onError(res.message));
      return;
    }
    this.alertesService
      .query()
      .pipe(
        filter((res: HttpResponse<IAlertes[]>) => res.ok),
        map((res: HttpResponse<IAlertes[]>) => res.body)
      )
      .subscribe(
        (res: IAlertes[]) => {
          this.alertes = res;
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
    this.registerChangeInAlertes();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IAlertes) {
    return item.id;
  }

  registerChangeInAlertes() {
    this.eventSubscriber = this.eventManager.subscribe('alertesListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
