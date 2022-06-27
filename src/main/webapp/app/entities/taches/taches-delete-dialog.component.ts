import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITaches } from 'app/shared/model/taches.model';
import { TachesService } from './taches.service';

@Component({
  selector: 'jhi-taches-delete-dialog',
  templateUrl: './taches-delete-dialog.component.html'
})
export class TachesDeleteDialogComponent {
  taches: ITaches;

  constructor(protected tachesService: TachesService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.tachesService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'tachesListModification',
        content: 'Deleted an taches'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-taches-delete-popup',
  template: ''
})
export class TachesDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ taches }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(TachesDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.taches = taches;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/taches', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/taches', { outlets: { popup: null } }]);
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
