/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { OperatappliTestModule } from '../../../test.module';
import { AlertesComponent } from 'app/entities/alertes/alertes.component';
import { AlertesService } from 'app/entities/alertes/alertes.service';
import { Alertes } from 'app/shared/model/alertes.model';

describe('Component Tests', () => {
  describe('Alertes Management Component', () => {
    let comp: AlertesComponent;
    let fixture: ComponentFixture<AlertesComponent>;
    let service: AlertesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OperatappliTestModule],
        declarations: [AlertesComponent],
        providers: []
      })
        .overrideTemplate(AlertesComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AlertesComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AlertesService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Alertes(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.alertes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
