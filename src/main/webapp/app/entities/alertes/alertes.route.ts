import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Alertes } from 'app/shared/model/alertes.model';
import { AlertesService } from './alertes.service';
import { AlertesComponent } from './alertes.component';
import { AlertesDetailComponent } from './alertes-detail.component';
import { AlertesUpdateComponent } from './alertes-update.component';
import { AlertesDeletePopupComponent } from './alertes-delete-dialog.component';
import { IAlertes } from 'app/shared/model/alertes.model';

@Injectable({ providedIn: 'root' })
export class AlertesResolve implements Resolve<IAlertes> {
  constructor(private service: AlertesService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IAlertes> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Alertes>) => response.ok),
        map((alertes: HttpResponse<Alertes>) => alertes.body)
      );
    }
    return of(new Alertes());
  }
}

export const alertesRoute: Routes = [
  {
    path: '',
    component: AlertesComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'operatappliApp.alertes.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: AlertesDetailComponent,
    resolve: {
      alertes: AlertesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'operatappliApp.alertes.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: AlertesUpdateComponent,
    resolve: {
      alertes: AlertesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'operatappliApp.alertes.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: AlertesUpdateComponent,
    resolve: {
      alertes: AlertesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'operatappliApp.alertes.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const alertesPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: AlertesDeletePopupComponent,
    resolve: {
      alertes: AlertesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'operatappliApp.alertes.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
