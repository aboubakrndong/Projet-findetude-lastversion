/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { OperatappliTestModule } from '../../../test.module';
import { TechnicienDetailComponent } from 'app/entities/technicien/technicien-detail.component';
import { Technicien } from 'app/shared/model/technicien.model';

describe('Component Tests', () => {
  describe('Technicien Management Detail Component', () => {
    let comp: TechnicienDetailComponent;
    let fixture: ComponentFixture<TechnicienDetailComponent>;
    const route = ({ data: of({ technicien: new Technicien(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OperatappliTestModule],
        declarations: [TechnicienDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(TechnicienDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TechnicienDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.technicien).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
