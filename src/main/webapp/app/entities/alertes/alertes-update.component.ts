import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IAlertes, Alertes } from 'app/shared/model/alertes.model';
import { AlertesService } from './alertes.service';
import { ITechnicien } from 'app/shared/model/technicien.model';
import { TechnicienService } from 'app/entities/technicien';
import { IBts } from 'app/shared/model/bts.model';
import { BtsService } from 'app/entities/bts';

@Component({
  selector: 'jhi-alertes-update',
  templateUrl: './alertes-update.component.html'
})
export class AlertesUpdateComponent implements OnInit {
  isSaving: boolean;

  techniciens: ITechnicien[];

  bts: IBts[];
  dateDp: any;

  editForm = this.fb.group({
    id: [],
    destinataire: [],
    details: [],
    date: [],
    techniciens: [],
    bts: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected alertesService: AlertesService,
    protected technicienService: TechnicienService,
    protected btsService: BtsService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ alertes }) => {
      this.updateForm(alertes);
    });
    this.technicienService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITechnicien[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITechnicien[]>) => response.body)
      )
      .subscribe((res: ITechnicien[]) => (this.techniciens = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.btsService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IBts[]>) => mayBeOk.ok),
        map((response: HttpResponse<IBts[]>) => response.body)
      )
      .subscribe((res: IBts[]) => (this.bts = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(alertes: IAlertes) {
    this.editForm.patchValue({
      id: alertes.id,
      destinataire: alertes.destinataire,
      details: alertes.details,
      date: alertes.date,
      techniciens: alertes.techniciens,
      bts: alertes.bts
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const alertes = this.createFromForm();
    if (alertes.id !== undefined) {
      this.subscribeToSaveResponse(this.alertesService.update(alertes));
    } else {
      this.subscribeToSaveResponse(this.alertesService.create(alertes));
    }
  }

  private createFromForm(): IAlertes {
    return {
      ...new Alertes(),
      id: this.editForm.get(['id']).value,
      destinataire: this.editForm.get(['destinataire']).value,
      details: this.editForm.get(['details']).value,
      date: this.editForm.get(['date']).value,
      techniciens: this.editForm.get(['techniciens']).value,
      bts: this.editForm.get(['bts']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAlertes>>) {
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

  trackTechnicienById(index: number, item: ITechnicien) {
    return item.id;
  }

  trackBtsById(index: number, item: IBts) {
    return item.id;
  }

  getSelected(selectedVals: Array<any>, option: any) {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
