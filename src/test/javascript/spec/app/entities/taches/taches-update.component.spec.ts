/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { OperatappliTestModule } from '../../../test.module';
import { TachesUpdateComponent } from 'app/entities/taches/taches-update.component';
import { TachesService } from 'app/entities/taches/taches.service';
import { Taches } from 'app/shared/model/taches.model';

describe('Component Tests', () => {
  describe('Taches Management Update Component', () => {
    let comp: TachesUpdateComponent;
    let fixture: ComponentFixture<TachesUpdateComponent>;
    let service: TachesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OperatappliTestModule],
        declarations: [TachesUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(TachesUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TachesUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TachesService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Taches(123);
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
        const entity = new Taches();
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
