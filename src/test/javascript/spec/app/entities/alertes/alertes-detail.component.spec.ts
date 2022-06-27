/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { OperatappliTestModule } from '../../../test.module';
import { AlertesDetailComponent } from 'app/entities/alertes/alertes-detail.component';
import { Alertes } from 'app/shared/model/alertes.model';

describe('Component Tests', () => {
  describe('Alertes Management Detail Component', () => {
    let comp: AlertesDetailComponent;
    let fixture: ComponentFixture<AlertesDetailComponent>;
    const route = ({ data: of({ alertes: new Alertes(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OperatappliTestModule],
        declarations: [AlertesDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(AlertesDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AlertesDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.alertes).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
