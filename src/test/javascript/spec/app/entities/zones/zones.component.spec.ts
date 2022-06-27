/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { OperatappliTestModule } from '../../../test.module';
import { ZonesComponent } from 'app/entities/zones/zones.component';
import { ZonesService } from 'app/entities/zones/zones.service';
import { Zones } from 'app/shared/model/zones.model';

describe('Component Tests', () => {
  describe('Zones Management Component', () => {
    let comp: ZonesComponent;
    let fixture: ComponentFixture<ZonesComponent>;
    let service: ZonesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OperatappliTestModule],
        declarations: [ZonesComponent],
        providers: []
      })
        .overrideTemplate(ZonesComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ZonesComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ZonesService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Zones(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.zones[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
