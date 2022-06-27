/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { OperatappliTestModule } from '../../../test.module';
import { KpiDetailComponent } from 'app/entities/kpi/kpi-detail.component';
import { Kpi } from 'app/shared/model/kpi.model';

describe('Component Tests', () => {
  describe('Kpi Management Detail Component', () => {
    let comp: KpiDetailComponent;
    let fixture: ComponentFixture<KpiDetailComponent>;
    const route = ({ data: of({ kpi: new Kpi(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OperatappliTestModule],
        declarations: [KpiDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(KpiDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(KpiDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.kpi).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
