import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Zones } from 'app/shared/model/zones.model';
import { ZonesService } from './zones.service';
import { ZonesComponent } from './zones.component';
import { ZonesDetailComponent } from './zones-detail.component';
import { ZonesUpdateComponent } from './zones-update.component';
import { ZonesDeletePopupComponent } from './zones-delete-dialog.component';
import { IZones } from 'app/shared/model/zones.model';

@Injectable({ providedIn: 'root' })
export class ZonesResolve implements Resolve<IZones> {
  constructor(private service: ZonesService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IZones> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Zones>) => response.ok),
        map((zones: HttpResponse<Zones>) => zones.body)
      );
    }
    return of(new Zones());
  }
}

export const zonesRoute: Routes = [
  {
    path: '',
    component: ZonesComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'operatappliApp.zones.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ZonesDetailComponent,
    resolve: {
      zones: ZonesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'operatappliApp.zones.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ZonesUpdateComponent,
    resolve: {
      zones: ZonesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'operatappliApp.zones.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ZonesUpdateComponent,
    resolve: {
      zones: ZonesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'operatappliApp.zones.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const zonesPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ZonesDeletePopupComponent,
    resolve: {
      zones: ZonesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'operatappliApp.zones.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
