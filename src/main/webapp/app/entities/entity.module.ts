import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'qos',
        loadChildren: './qos/qos.module#OperatappliQosModule'
      },
      {
        path: 'zones',
        loadChildren: './zones/zones.module#OperatappliZonesModule'
      },
      {
        path: 'kpi',
        loadChildren: './kpi/kpi.module#OperatappliKpiModule'
      },
      {
        path: 'alertes',
        loadChildren: './alertes/alertes.module#OperatappliAlertesModule'
      },
      {
        path: 'bts',
        loadChildren: './bts/bts.module#OperatappliBtsModule'
      },
      {
        path: 'taches',
        loadChildren: './taches/taches.module#OperatappliTachesModule'
      },
      {
        path: 'technicien',
        loadChildren: './technicien/technicien.module#OperatappliTechnicienModule'
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OperatappliEntityModule {}
