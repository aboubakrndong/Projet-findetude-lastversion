/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { OperatappliTestModule } from '../../../test.module';
import { TechnicienDeleteDialogComponent } from 'app/entities/technicien/technicien-delete-dialog.component';
import { TechnicienService } from 'app/entities/technicien/technicien.service';

describe('Component Tests', () => {
  describe('Technicien Management Delete Component', () => {
    let comp: TechnicienDeleteDialogComponent;
    let fixture: ComponentFixture<TechnicienDeleteDialogComponent>;
    let service: TechnicienService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OperatappliTestModule],
        declarations: [TechnicienDeleteDialogComponent]
      })
        .overrideTemplate(TechnicienDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TechnicienDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TechnicienService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
