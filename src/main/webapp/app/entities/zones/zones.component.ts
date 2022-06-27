import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IZones } from 'app/shared/model/zones.model';
import { AccountService } from 'app/core';
import { ZonesService } from './zones.service';

@Component({
  selector: 'jhi-zones',
  templateUrl: './zones.component.html'
})
export class ZonesComponent implements OnInit, OnDestroy {
  zones: IZones[];
  currentAccount: any;
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected zonesService: ZonesService,
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
      this.zonesService
        .search({
          query: this.currentSearch
        })
        .pipe(
          filter((res: HttpResponse<IZones[]>) => res.ok),
          map((res: HttpResponse<IZones[]>) => res.body)
        )
        .subscribe((res: IZones[]) => (this.zones = res), (res: HttpErrorResponse) => this.onError(res.message));
      return;
    }
    this.zonesService
      .query()
      .pipe(
        filter((res: HttpResponse<IZones[]>) => res.ok),
        map((res: HttpResponse<IZones[]>) => res.body)
      )
      .subscribe(
        (res: IZones[]) => {
          this.zones = res;
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
    this.registerChangeInZones();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IZones) {
    return item.id;
  }

  registerChangeInZones() {
    this.eventSubscriber = this.eventManager.subscribe('zonesListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
