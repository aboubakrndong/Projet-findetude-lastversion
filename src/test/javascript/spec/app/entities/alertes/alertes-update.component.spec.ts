/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { OperatappliTestModule } from '../../../test.module';
import { AlertesUpdateComponent } from 'app/entities/alertes/alertes-update.component';
import { AlertesService } from 'app/entities/alertes/alertes.service';
import { Alertes } from 'app/shared/model/alertes.model';

describe('Component Tests', () => {
  describe('Alertes Management Update Component', () => {
    let comp: AlertesUpdateComponent;
    let fixture: ComponentFixture<AlertesUpdateComponent>;
    let service: AlertesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OperatappliTestModule],
        declarations: [AlertesUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(AlertesUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AlertesUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AlertesService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Alertes(123);
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
        const entity = new Alertes();
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
