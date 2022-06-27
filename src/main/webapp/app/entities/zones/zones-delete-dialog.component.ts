import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IZones } from 'app/shared/model/zones.model';
import { ZonesService } from './zones.service';

@Component({
  selector: 'jhi-zones-delete-dialog',
  templateUrl: './zones-delete-dialog.component.html'
})
export class ZonesDeleteDialogComponent {
  zones: IZones;

  constructor(protected zonesService: ZonesService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.zonesService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'zonesListModification',
        content: 'Deleted an zones'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-zones-delete-popup',
  template: ''
})
export class ZonesDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ zones }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ZonesDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.zones = zones;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/zones', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/zones', { outlets: { popup: null } }]);
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
