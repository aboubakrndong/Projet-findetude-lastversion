import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Taches } from 'app/shared/model/taches.model';
import { TachesService } from './taches.service';
import { TachesComponent } from './taches.component';
import { TachesDetailComponent } from './taches-detail.component';
import { TachesUpdateComponent } from './taches-update.component';
import { TachesDeletePopupComponent } from './taches-delete-dialog.component';
import { ITaches } from 'app/shared/model/taches.model';

@Injectable({ providedIn: 'root' })
export class TachesResolve implements Resolve<ITaches> {
  constructor(private service: TachesService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITaches> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Taches>) => response.ok),
        map((taches: HttpResponse<Taches>) => taches.body)
      );
    }
    return of(new Taches());
  }
}

export const tachesRoute: Routes = [
  {
    path: '',
    component: TachesComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'operatappliApp.taches.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TachesDetailComponent,
    resolve: {
      taches: TachesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'operatappliApp.taches.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TachesUpdateComponent,
    resolve: {
      taches: TachesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'operatappliApp.taches.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TachesUpdateComponent,
    resolve: {
      taches: TachesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'operatappliApp.taches.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const tachesPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: TachesDeletePopupComponent,
    resolve: {
      taches: TachesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'operatappliApp.taches.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
