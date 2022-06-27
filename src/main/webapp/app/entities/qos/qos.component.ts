import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IQos } from 'app/shared/model/qos.model';
import { AccountService } from 'app/core';
import { QosService } from './qos.service';

@Component({
  selector: 'jhi-qos',
  templateUrl: './qos.component.html'
})
export class QosComponent implements OnInit, OnDestroy {
  qos: IQos[];
  currentAccount: any;
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected qosService: QosService,
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
      this.qosService
        .search({
          query: this.currentSearch
        })
        .pipe(
          filter((res: HttpResponse<IQos[]>) => res.ok),
          map((res: HttpResponse<IQos[]>) => res.body)
        )
        .subscribe((res: IQos[]) => (this.qos = res), (res: HttpErrorResponse) => this.onError(res.message));
      return;
    }
    this.qosService
      .query()
      .pipe(
        filter((res: HttpResponse<IQos[]>) => res.ok),
        map((res: HttpResponse<IQos[]>) => res.body)
      )
      .subscribe(
        (res: IQos[]) => {
          this.qos = res;
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
    this.registerChangeInQos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IQos) {
    return item.id;
  }

  registerChangeInQos() {
    this.eventSubscriber = this.eventManager.subscribe('qosListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
