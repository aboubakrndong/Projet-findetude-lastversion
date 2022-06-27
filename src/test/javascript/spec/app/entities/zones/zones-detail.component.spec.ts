/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { OperatappliTestModule } from '../../../test.module';
import { ZonesDetailComponent } from 'app/entities/zones/zones-detail.component';
import { Zones } from 'app/shared/model/zones.model';

describe('Component Tests', () => {
  describe('Zones Management Detail Component', () => {
    let comp: ZonesDetailComponent;
    let fixture: ComponentFixture<ZonesDetailComponent>;
    const route = ({ data: of({ zones: new Zones(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OperatappliTestModule],
        declarations: [ZonesDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ZonesDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ZonesDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.zones).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
