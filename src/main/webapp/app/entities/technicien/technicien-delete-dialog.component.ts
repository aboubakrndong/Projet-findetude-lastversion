import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITechnicien } from 'app/shared/model/technicien.model';
import { TechnicienService } from './technicien.service';

@Component({
  selector: 'jhi-technicien-delete-dialog',
  templateUrl: './technicien-delete-dialog.component.html'
})
export class TechnicienDeleteDialogComponent {
  technicien: ITechnicien;

  constructor(
    protected technicienService: TechnicienService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.technicienService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'technicienListModification',
        content: 'Deleted an technicien'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-technicien-delete-popup',
  template: ''
})
export class TechnicienDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ technicien }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(TechnicienDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.technicien = technicien;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/technicien', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/technicien', { outlets: { popup: null } }]);
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
