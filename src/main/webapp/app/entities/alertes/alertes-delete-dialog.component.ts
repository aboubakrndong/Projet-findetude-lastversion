import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAlertes } from 'app/shared/model/alertes.model';
import { AlertesService } from './alertes.service';

@Component({
  selector: 'jhi-alertes-delete-dialog',
  templateUrl: './alertes-delete-dialog.component.html'
})
export class AlertesDeleteDialogComponent {
  alertes: IAlertes;

  constructor(protected alertesService: AlertesService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.alertesService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'alertesListModification',
        content: 'Deleted an alertes'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-alertes-delete-popup',
  template: ''
})
export class AlertesDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ alertes }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(AlertesDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.alertes = alertes;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/alertes', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/alertes', { outlets: { popup: null } }]);
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
