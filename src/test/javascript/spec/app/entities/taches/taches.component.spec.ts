/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { OperatappliTestModule } from '../../../test.module';
import { TachesComponent } from 'app/entities/taches/taches.component';
import { TachesService } from 'app/entities/taches/taches.service';
import { Taches } from 'app/shared/model/taches.model';

describe('Component Tests', () => {
  describe('Taches Management Component', () => {
    let comp: TachesComponent;
    let fixture: ComponentFixture<TachesComponent>;
    let service: TachesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OperatappliTestModule],
        declarations: [TachesComponent],
        providers: []
      })
        .overrideTemplate(TachesComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TachesComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TachesService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Taches(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.taches[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
