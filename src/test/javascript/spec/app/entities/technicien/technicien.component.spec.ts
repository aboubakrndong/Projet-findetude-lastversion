/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { OperatappliTestModule } from '../../../test.module';
import { TechnicienComponent } from 'app/entities/technicien/technicien.component';
import { TechnicienService } from 'app/entities/technicien/technicien.service';
import { Technicien } from 'app/shared/model/technicien.model';

describe('Component Tests', () => {
  describe('Technicien Management Component', () => {
    let comp: TechnicienComponent;
    let fixture: ComponentFixture<TechnicienComponent>;
    let service: TechnicienService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OperatappliTestModule],
        declarations: [TechnicienComponent],
        providers: []
      })
        .overrideTemplate(TechnicienComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TechnicienComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TechnicienService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Technicien(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.techniciens[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
