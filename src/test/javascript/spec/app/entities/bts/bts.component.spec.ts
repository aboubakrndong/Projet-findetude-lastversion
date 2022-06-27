/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { OperatappliTestModule } from '../../../test.module';
import { BtsComponent } from 'app/entities/bts/bts.component';
import { BtsService } from 'app/entities/bts/bts.service';
import { Bts } from 'app/shared/model/bts.model';

describe('Component Tests', () => {
  describe('Bts Management Component', () => {
    let comp: BtsComponent;
    let fixture: ComponentFixture<BtsComponent>;
    let service: BtsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OperatappliTestModule],
        declarations: [BtsComponent],
        providers: []
      })
        .overrideTemplate(BtsComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(BtsComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BtsService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Bts(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.bts[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
