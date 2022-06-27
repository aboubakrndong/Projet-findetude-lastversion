/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { OperatappliTestModule } from '../../../test.module';
import { KpiUpdateComponent } from 'app/entities/kpi/kpi-update.component';
import { KpiService } from 'app/entities/kpi/kpi.service';
import { Kpi } from 'app/shared/model/kpi.model';

describe('Component Tests', () => {
  describe('Kpi Management Update Component', () => {
    let comp: KpiUpdateComponent;
    let fixture: ComponentFixture<KpiUpdateComponent>;
    let service: KpiService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OperatappliTestModule],
        declarations: [KpiUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(KpiUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(KpiUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(KpiService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Kpi(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Kpi();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
