/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { OperatappliTestModule } from '../../../test.module';
import { TachesDeleteDialogComponent } from 'app/entities/taches/taches-delete-dialog.component';
import { TachesService } from 'app/entities/taches/taches.service';

describe('Component Tests', () => {
  describe('Taches Management Delete Component', () => {
    let comp: TachesDeleteDialogComponent;
    let fixture: ComponentFixture<TachesDeleteDialogComponent>;
    let service: TachesService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OperatappliTestModule],
        declarations: [TachesDeleteDialogComponent]
      })
        .overrideTemplate(TachesDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TachesDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TachesService);
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
