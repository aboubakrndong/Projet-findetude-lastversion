import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBts } from 'app/shared/model/bts.model';
import { BtsService } from './bts.service';

@Component({
  selector: 'jhi-bts-delete-dialog',
  templateUrl: './bts-delete-dialog.component.html'
})
export class BtsDeleteDialogComponent {
  bts: IBts;

  constructor(protected btsService: BtsService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.btsService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'btsListModification',
        content: 'Deleted an bts'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-bts-delete-popup',
  template: ''
})
export class BtsDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ bts }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(BtsDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.bts = bts;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/bts', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/bts', { outlets: { popup: null } }]);
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
