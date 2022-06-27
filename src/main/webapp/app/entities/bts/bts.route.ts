import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Bts } from 'app/shared/model/bts.model';
import { BtsService } from './bts.service';
import { BtsComponent } from './bts.component';
import { BtsDetailComponent } from './bts-detail.component';
import { BtsUpdateComponent } from './bts-update.component';
import { BtsDeletePopupComponent } from './bts-delete-dialog.component';
import { IBts } from 'app/shared/model/bts.model';

@Injectable({ providedIn: 'root' })
export class BtsResolve implements Resolve<IBts> {
  constructor(private service: BtsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IBts> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Bts>) => response.ok),
        map((bts: HttpResponse<Bts>) => bts.body)
      );
    }
    return of(new Bts());
  }
}

export const btsRoute: Routes = [
  {
    path: '',
    component: BtsComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'operatappliApp.bts.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: BtsDetailComponent,
    resolve: {
      bts: BtsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'operatappliApp.bts.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: BtsUpdateComponent,
    resolve: {
      bts: BtsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'operatappliApp.bts.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: BtsUpdateComponent,
    resolve: {
      bts: BtsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'operatappliApp.bts.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const btsPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: BtsDeletePopupComponent,
    resolve: {
      bts: BtsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'operatappliApp.bts.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
