/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { OperatappliTestModule } from '../../../test.module';
import { BtsDetailComponent } from 'app/entities/bts/bts-detail.component';
import { Bts } from 'app/shared/model/bts.model';

describe('Component Tests', () => {
  describe('Bts Management Detail Component', () => {
    let comp: BtsDetailComponent;
    let fixture: ComponentFixture<BtsDetailComponent>;
    const route = ({ data: of({ bts: new Bts(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OperatappliTestModule],
        declarations: [BtsDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(BtsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(BtsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.bts).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
