/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { OperatappliTestModule } from '../../../test.module';
import { BtsDeleteDialogComponent } from 'app/entities/bts/bts-delete-dialog.component';
import { BtsService } from 'app/entities/bts/bts.service';

describe('Component Tests', () => {
  describe('Bts Management Delete Component', () => {
    let comp: BtsDeleteDialogComponent;
    let fixture: ComponentFixture<BtsDeleteDialogComponent>;
    let service: BtsService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OperatappliTestModule],
        declarations: [BtsDeleteDialogComponent]
      })
        .overrideTemplate(BtsDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(BtsDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BtsService);
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
