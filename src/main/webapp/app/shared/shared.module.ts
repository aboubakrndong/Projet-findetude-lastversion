import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { OperatappliSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [OperatappliSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [OperatappliSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OperatappliSharedModule {
  static forRoot() {
    return {
      ngModule: OperatappliSharedModule
    };
  }
}
