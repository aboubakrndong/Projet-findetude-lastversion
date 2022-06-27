import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { OperatappliSharedModule } from 'app/shared';
import {
  AlertesComponent,
  AlertesDetailComponent,
  AlertesUpdateComponent,
  AlertesDeletePopupComponent,
  AlertesDeleteDialogComponent,
  alertesRoute,
  alertesPopupRoute
} from './';

const ENTITY_STATES = [...alertesRoute, ...alertesPopupRoute];

@NgModule({
  imports: [OperatappliSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    AlertesComponent,
    AlertesDetailComponent,
    AlertesUpdateComponent,
    AlertesDeleteDialogComponent,
    AlertesDeletePopupComponent
  ],
  entryComponents: [AlertesComponent, AlertesUpdateComponent, AlertesDeleteDialogComponent, AlertesDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OperatappliAlertesModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
