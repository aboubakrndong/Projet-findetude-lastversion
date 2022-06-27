/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { OperatappliTestModule } from '../../../test.module';
import { ZonesUpdateComponent } from 'app/entities/zones/zones-update.component';
import { ZonesService } from 'app/entities/zones/zones.service';
import { Zones } from 'app/shared/model/zones.model';

describe('Component Tests', () => {
  describe('Zones Management Update Component', () => {
    let comp: ZonesUpdateComponent;
    let fixture: ComponentFixture<ZonesUpdateComponent>;
    let service: ZonesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OperatappliTestModule],
        declarations: [ZonesUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ZonesUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ZonesUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ZonesService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Zones(123);
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
        const entity = new Zones();
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
