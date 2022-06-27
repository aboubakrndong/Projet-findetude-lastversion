import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Qos } from 'app/shared/model/qos.model';
import { QosService } from './qos.service';
import { QosComponent } from './qos.component';
import { QosDetailComponent } from './qos-detail.component';
import { QosUpdateComponent } from './qos-update.component';
import { QosDeletePopupComponent } from './qos-delete-dialog.component';
import { IQos } from 'app/shared/model/qos.model';

@Injectable({ providedIn: 'root' })
export class QosResolve implements Resolve<IQos> {
  constructor(private service: QosService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IQos> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Qos>) => response.ok),
        map((qos: HttpResponse<Qos>) => qos.body)
      );
    }
    return of(new Qos());
  }
}

export const qosRoute: Routes = [
  {
    path: '',
    component: QosComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'operatappliApp.qos.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: QosDetailComponent,
    resolve: {
      qos: QosResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'operatappliApp.qos.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: QosUpdateComponent,
    resolve: {
      qos: QosResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'operatappliApp.qos.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: QosUpdateComponent,
    resolve: {
      qos: QosResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'operatappliApp.qos.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const qosPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: QosDeletePopupComponent,
    resolve: {
      qos: QosResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'operatappliApp.qos.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
