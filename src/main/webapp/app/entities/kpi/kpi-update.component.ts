import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IKpi, Kpi } from 'app/shared/model/kpi.model';
import { KpiService } from './kpi.service';
import { IZones } from 'app/shared/model/zones.model';
import { ZonesService } from 'app/entities/zones';

@Component({
  selector: 'jhi-kpi-update',
  templateUrl: './kpi-update.component.html'
})
export class KpiUpdateComponent implements OnInit {
  isSaving: boolean;

  zones: IZones[];

  editForm = this.fb.group({
    id: [],
    tauxdappels: [],
    tauxdepertes: [],
    tauxderejets: [],
    zones: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected kpiService: KpiService,
    protected zonesService: ZonesService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ kpi }) => {
      this.updateForm(kpi);
    });
    this.zonesService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IZones[]>) => mayBeOk.ok),
        map((response: HttpResponse<IZones[]>) => response.body)
      )
      .subscribe((res: IZones[]) => (this.zones = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(kpi: IKpi) {
    this.editForm.patchValue({
      id: kpi.id,
      tauxdappels: kpi.tauxdappels,
      tauxdepertes: kpi.tauxdepertes,
      tauxderejets: kpi.tauxderejets,
      zones: kpi.zones
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const kpi = this.createFromForm();
    if (kpi.id !== undefined) {
      this.subscribeToSaveResponse(this.kpiService.update(kpi));
    } else {
      this.subscribeToSaveResponse(this.kpiService.create(kpi));
    }
  }

  private createFromForm(): IKpi {
    return {
      ...new Kpi(),
      id: this.editForm.get(['id']).value,
      tauxdappels: this.editForm.get(['tauxdappels']).value,
      tauxdepertes: this.editForm.get(['tauxdepertes']).value,
      tauxderejets: this.editForm.get(['tauxderejets']).value,
      zones: this.editForm.get(['zones']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IKpi>>) {
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
