/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { OperatappliTestModule } from '../../../test.module';
import { AlertesDeleteDialogComponent } from 'app/entities/alertes/alertes-delete-dialog.component';
import { AlertesService } from 'app/entities/alertes/alertes.service';

describe('Component Tests', () => {
  describe('Alertes Management Delete Component', () => {
    let comp: AlertesDeleteDialogComponent;
    let fixture: ComponentFixture<AlertesDeleteDialogComponent>;
    let service: AlertesService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OperatappliTestModule],
        declarations: [AlertesDeleteDialogComponent]
      })
        .overrideTemplate(AlertesDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AlertesDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AlertesService);
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
