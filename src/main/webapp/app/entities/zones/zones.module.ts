import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { OperatappliSharedModule } from 'app/shared';
import {
  ZonesComponent,
  ZonesDetailComponent,
  ZonesUpdateComponent,
  ZonesDeletePopupComponent,
  ZonesDeleteDialogComponent,
  zonesRoute,
  zonesPopupRoute
} from './';

const ENTITY_STATES = [...zonesRoute, ...zonesPopupRoute];

@NgModule({
  imports: [OperatappliSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [ZonesComponent, ZonesDetailComponent, ZonesUpdateComponent, ZonesDeleteDialogComponent, ZonesDeletePopupComponent],
  entryComponents: [ZonesComponent, ZonesUpdateComponent, ZonesDeleteDialogComponent, ZonesDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OperatappliZonesModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
