import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IBts } from 'app/shared/model/bts.model';
import { AccountService } from 'app/core';
import { BtsService } from './bts.service';

@Component({
  selector: 'jhi-bts',
  templateUrl: './bts.component.html'
})
export class BtsComponent implements OnInit, OnDestroy {
  bts: IBts[];
  currentAccount: any;
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected btsService: BtsService,
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
      this.btsService
        .search({
          query: this.currentSearch
        })
        .pipe(
          filter((res: HttpResponse<IBts[]>) => res.ok),
          map((res: HttpResponse<IBts[]>) => res.body)
        )
        .subscribe((res: IBts[]) => (this.bts = res), (res: HttpErrorResponse) => this.onError(res.message));
      return;
    }
    this.btsService
      .query()
      .pipe(
        filter((res: HttpResponse<IBts[]>) => res.ok),
        map((res: HttpResponse<IBts[]>) => res.body)
      )
      .subscribe(
        (res: IBts[]) => {
          this.bts = res;
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
    this.registerChangeInBts();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IBts) {
    return item.id;
  }

  registerChangeInBts() {
    this.eventSubscriber = this.eventManager.subscribe('btsListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
