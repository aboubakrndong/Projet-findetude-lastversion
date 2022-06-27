/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { OperatappliTestModule } from '../../../test.module';
import { QosDetailComponent } from 'app/entities/qos/qos-detail.component';
import { Qos } from 'app/shared/model/qos.model';

describe('Component Tests', () => {
  describe('Qos Management Detail Component', () => {
    let comp: QosDetailComponent;
    let fixture: ComponentFixture<QosDetailComponent>;
    const route = ({ data: of({ qos: new Qos(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OperatappliTestModule],
        declarations: [QosDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(QosDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(QosDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.qos).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
