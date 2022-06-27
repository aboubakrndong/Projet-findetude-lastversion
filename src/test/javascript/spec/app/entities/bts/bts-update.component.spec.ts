/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { OperatappliTestModule } from '../../../test.module';
import { BtsUpdateComponent } from 'app/entities/bts/bts-update.component';
import { BtsService } from 'app/entities/bts/bts.service';
import { Bts } from 'app/shared/model/bts.model';

describe('Component Tests', () => {
  describe('Bts Management Update Component', () => {
    let comp: BtsUpdateComponent;
    let fixture: ComponentFixture<BtsUpdateComponent>;
    let service: BtsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OperatappliTestModule],
        declarations: [BtsUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(BtsUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(BtsUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BtsService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Bts(123);
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
        const entity = new Bts();
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
