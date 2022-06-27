import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IQos } from 'app/shared/model/qos.model';
import { QosService } from './qos.service';

@Component({
  selector: 'jhi-qos-delete-dialog',
  templateUrl: './qos-delete-dialog.component.html'
})
export class QosDeleteDialogComponent {
  qos: IQos;

  constructor(protected qosService: QosService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.qosService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'qosListModification',
        content: 'Deleted an qos'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-qos-delete-popup',
  template: ''
})
export class QosDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ qos }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(QosDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.qos = qos;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/qos', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/qos', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
