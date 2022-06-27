import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Kpi } from 'app/shared/model/kpi.model';
import { KpiService } from './kpi.service';
import { KpiComponent } from './kpi.component';
import { KpiDetailComponent } from './kpi-detail.component';
import { KpiUpdateComponent } from './kpi-update.component';
import { KpiDeletePopupComponent } from './kpi-delete-dialog.component';
import { IKpi } from 'app/shared/model/kpi.model';

@Injectable({ providedIn: 'root' })
export class KpiResolve implements Resolve<IKpi> {
  constructor(private service: KpiService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IKpi> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Kpi>) => response.ok),
        map((kpi: HttpResponse<Kpi>) => kpi.body)
      );
    }
    return of(new Kpi());
  }
}

export const kpiRoute: Routes = [
  {
    path: '',
    component: KpiComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'operatappliApp.kpi.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: KpiDetailComponent,
    resolve: {
      kpi: KpiResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'operatappliApp.kpi.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: KpiUpdateComponent,
    resolve: {
      kpi: KpiResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'operatappliApp.kpi.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: KpiUpdateComponent,
    resolve: {
      kpi: KpiResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'operatappliApp.kpi.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const kpiPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: KpiDeletePopupComponent,
    resolve: {
      kpi: KpiResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'operatappliApp.kpi.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
