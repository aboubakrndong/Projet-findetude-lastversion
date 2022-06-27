/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { OperatappliTestModule } from '../../../test.module';
import { TachesDetailComponent } from 'app/entities/taches/taches-detail.component';
import { Taches } from 'app/shared/model/taches.model';

describe('Component Tests', () => {
  describe('Taches Management Detail Component', () => {
    let comp: TachesDetailComponent;
    let fixture: ComponentFixture<TachesDetailComponent>;
    const route = ({ data: of({ taches: new Taches(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OperatappliTestModule],
        declarations: [TachesDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(TachesDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TachesDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.taches).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
