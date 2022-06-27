import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OperatappliSharedModule } from 'app/shared';
import { HOME_ROUTE, HomeComponent } from './';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { MatFormFieldModule, MatRadioModule } from '@angular/material';

@NgModule({
  imports: [
    OperatappliSharedModule,
    RouterModule.forChild([HOME_ROUTE]),
    NgxMapboxGLModule,
    NgxMapboxGLModule.withConfig({
      accessToken: 'pk.eyJ1IjoiYWJvdWJha3JuZG9uZyIsImEiOiJjanJzd3hpdjQwZjRtNDRteXpxMjltMGwzIn0.p75-6jc5BbNG5JpY-WBxLg', // Optionnal, can also be set per map (accessToken input of mgl-map)
      geocoderAccessToken: 'TOKEN' // Optionnal, specify if different from the map access token, can also be set per mgl-geocoder (accessToken input of mgl-geocoder)
    }),
    MatRadioModule,
    MatFormFieldModule
  ],
  declarations: [HomeComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OperatappliHomeModule {}
