import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { ITaches, Taches } from 'app/shared/model/taches.model';
import { TachesService } from './taches.service';
import { ITechnicien } from 'app/shared/model/technicien.model';
import { TechnicienService } from 'app/entities/technicien';

@Component({
  selector: 'jhi-taches-update',
  templateUrl: './taches-update.component.html'
})
export class TachesUpdateComponent implements OnInit {
  isSaving: boolean;

  techniciens: ITechnicien[];
  datededebutDp: any;
  datedefinDp: any;

  editForm = this.fb.group({
    id: [],
    type: [],
    datededebut: [],
    datedefin: [],
    techniciens: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected tachesService: TachesService,
    protected technicienService: TechnicienService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ taches }) => {
      this.updateForm(taches);
    });
    this.technicienService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITechnicien[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITechnicien[]>) => response.body)
      )
      .subscribe((res: ITechnicien[]) => (this.techniciens = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(taches: ITaches) {
    this.editForm.patchValue({
      id: taches.id,
      type: taches.type,
      datededebut: taches.datededebut,
      datedefin: taches.datedefin,
      techniciens: taches.techniciens
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const taches = this.createFromForm();
    if (taches.id !== undefined) {
      this.subscribeToSaveResponse(this.tachesService.update(taches));
    } else {
      this.subscribeToSaveResponse(this.tachesService.create(taches));
    }
  }

  private createFromForm(): ITaches {
    return {
      ...new Taches(),
      id: this.editForm.get(['id']).value,
      type: this.editForm.get(['type']).value,
      datededebut: this.editForm.get(['datededebut']).value,
      datedefin: this.editForm.get(['datedefin']).value,
      techniciens: this.editForm.get(['techniciens']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITaches>>) {
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
