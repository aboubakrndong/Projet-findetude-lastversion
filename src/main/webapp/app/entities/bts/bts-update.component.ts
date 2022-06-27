import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IBts, Bts } from 'app/shared/model/bts.model';
import { BtsService } from './bts.service';
import { IZones } from 'app/shared/model/zones.model';
import { ZonesService } from 'app/entities/zones';

@Component({
  selector: 'jhi-bts-update',
  templateUrl: './bts-update.component.html'
})
export class BtsUpdateComponent implements OnInit {
  isSaving: boolean;

  zones: IZones[];

  editForm = this.fb.group({
    id: [],
    type: [],
    puissance: [],
    etat: [],
    zones: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected btsService: BtsService,
    protected zonesService: ZonesService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ bts }) => {
      this.updateForm(bts);
    });
    this.zonesService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IZones[]>) => mayBeOk.ok),
        map((response: HttpResponse<IZones[]>) => response.body)
      )
      .subscribe((res: IZones[]) => (this.zones = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(bts: IBts) {
    this.editForm.patchValue({
      id: bts.id,
      type: bts.type,
      puissance: bts.puissance,
      etat: bts.etat,
      zones: bts.zones
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const bts = this.createFromForm();
    if (bts.id !== undefined) {
      this.subscribeToSaveResponse(this.btsService.update(bts));
    } else {
      this.subscribeToSaveResponse(this.btsService.create(bts));
    }
  }

  private createFromForm(): IBts {
    return {
      ...new Bts(),
      id: this.editForm.get(['id']).value,
      type: this.editForm.get(['type']).value,
      puissance: this.editForm.get(['puissance']).value,
      etat: this.editForm.get(['etat']).value,
      zones: this.editForm.get(['zones']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBts>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackZonesById(index: number, item: IZones) {
    return item.id;
  }
}
