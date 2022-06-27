/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { OperatappliTestModule } from '../../../test.module';
import { QosUpdateComponent } from 'app/entities/qos/qos-update.component';
import { QosService } from 'app/entities/qos/qos.service';
import { Qos } from 'app/shared/model/qos.model';

describe('Component Tests', () => {
  describe('Qos Management Update Component', () => {
    let comp: QosUpdateComponent;
    let fixture: ComponentFixture<QosUpdateComponent>;
    let service: QosService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OperatappliTestModule],
        declarations: [QosUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(QosUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(QosUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(QosService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Qos(123);
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
        const entity = new Qos();
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
