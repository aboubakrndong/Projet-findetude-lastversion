import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { OperatappliSharedModule } from 'app/shared';
import {
  TachesComponent,
  TachesDetailComponent,
  TachesUpdateComponent,
  TachesDeletePopupComponent,
  TachesDeleteDialogComponent,
  tachesRoute,
  tachesPopupRoute
} from './';

const ENTITY_STATES = [...tachesRoute, ...tachesPopupRoute];

@NgModule({
  imports: [OperatappliSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [TachesComponent, TachesDetailComponent, TachesUpdateComponent, TachesDeleteDialogComponent, TachesDeletePopupComponent],
  entryComponents: [TachesComponent, TachesUpdateComponent, TachesDeleteDialogComponent, TachesDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OperatappliTachesModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
