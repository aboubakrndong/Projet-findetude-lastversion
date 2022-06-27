import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IKpi } from 'app/shared/model/kpi.model';
import { KpiService } from './kpi.service';

@Component({
  selector: 'jhi-kpi-delete-dialog',
  templateUrl: './kpi-delete-dialog.component.html'
})
export class KpiDeleteDialogComponent {
  kpi: IKpi;

  constructor(protected kpiService: KpiService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.kpiService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'kpiListModification',
        content: 'Deleted an kpi'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-kpi-delete-popup',
  template: ''
})
export class KpiDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ kpi }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(KpiDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.kpi = kpi;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/kpi', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/kpi', { outlets: { popup: null } }]);
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
