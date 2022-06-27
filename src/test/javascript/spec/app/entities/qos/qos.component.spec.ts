/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { OperatappliTestModule } from '../../../test.module';
import { QosComponent } from 'app/entities/qos/qos.component';
import { QosService } from 'app/entities/qos/qos.service';
import { Qos } from 'app/shared/model/qos.model';

describe('Component Tests', () => {
  describe('Qos Management Component', () => {
    let comp: QosComponent;
    let fixture: ComponentFixture<QosComponent>;
    let service: QosService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OperatappliTestModule],
        declarations: [QosComponent],
        providers: []
      })
        .overrideTemplate(QosComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(QosComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(QosService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Qos(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.qos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
