import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IQos, Qos } from 'app/shared/model/qos.model';
import { QosService } from './qos.service';
import { IZones } from 'app/shared/model/zones.model';
import { ZonesService } from 'app/entities/zones';

@Component({
  selector: 'jhi-qos-update',
  templateUrl: './qos-update.component.html'
})
export class QosUpdateComponent implements OnInit {
  isSaving: boolean;

  zones: IZones[];

  editForm = this.fb.group({
    id: [],
    traffic: [],
    tempsdereponse: [],
    sensibilite: [],
    debit: [],
    zones: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected qosService: QosService,
    protected zonesService: ZonesService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ qos }) => {
      this.updateForm(qos);
    });
    this.zonesService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IZones[]>) => mayBeOk.ok),
        map((response: HttpResponse<IZones[]>) => response.body)
      )
      .subscribe((res: IZones[]) => (this.zones = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(qos: IQos) {
    this.editForm.patchValue({
      id: qos.id,
      traffic: qos.traffic,
      tempsdereponse: qos.tempsdereponse,
      sensibilite: qos.sensibilite,
      debit: qos.debit,
      zones: qos.zones
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const qos = this.createFromForm();
    if (qos.id !== undefined) {
      this.subscribeToSaveResponse(this.qosService.update(qos));
    } else {
      this.subscribeToSaveResponse(this.qosService.create(qos));
    }
  }

  private createFromForm(): IQos {
    return {
      ...new Qos(),
      id: this.editForm.get(['id']).value,
      traffic: this.editForm.get(['traffic']).value,
      tempsdereponse: this.editForm.get(['tempsdereponse']).value,
      sensibilite: this.editForm.get(['sensibilite']).value,
      debit: this.editForm.get(['debit']).value,
      zones: this.editForm.get(['zones']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IQos>>) {
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
