import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { OperatappliSharedModule } from 'app/shared';
import {
  TechnicienComponent,
  TechnicienDetailComponent,
  TechnicienUpdateComponent,
  TechnicienDeletePopupComponent,
  TechnicienDeleteDialogComponent,
  technicienRoute,
  technicienPopupRoute
} from './';

const ENTITY_STATES = [...technicienRoute, ...technicienPopupRoute];

@NgModule({
  imports: [OperatappliSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    TechnicienComponent,
    TechnicienDetailComponent,
    TechnicienUpdateComponent,
    TechnicienDeleteDialogComponent,
    TechnicienDeletePopupComponent
  ],
  entryComponents: [TechnicienComponent, TechnicienUpdateComponent, TechnicienDeleteDialogComponent, TechnicienDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OperatappliTechnicienModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
