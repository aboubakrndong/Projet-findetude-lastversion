import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { ITechnicien, Technicien } from 'app/shared/model/technicien.model';
import { TechnicienService } from './technicien.service';
import { IAlertes } from 'app/shared/model/alertes.model';
import { AlertesService } from 'app/entities/alertes';
import { ITaches } from 'app/shared/model/taches.model';
import { TachesService } from 'app/entities/taches';

@Component({
  selector: 'jhi-technicien-update',
  templateUrl: './technicien-update.component.html'
})
export class TechnicienUpdateComponent implements OnInit {
  isSaving: boolean;

  alertes: IAlertes[];

  taches: ITaches[];
  datedenaissanceDp: any;

  editForm = this.fb.group({
    id: [],
    nom: [],
    prenom: [],
    datedenaissance: [],
    specialite: [],
    email: [],
    domaine: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected technicienService: TechnicienService,
    protected alertesService: AlertesService,
    protected tachesService: TachesService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ technicien }) => {
      this.updateForm(technicien);
    });
    this.alertesService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IAlertes[]>) => mayBeOk.ok),
        map((response: HttpResponse<IAlertes[]>) => response.body)
      )
      .subscribe((res: IAlertes[]) => (this.alertes = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.tachesService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITaches[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITaches[]>) => response.body)
      )
      .subscribe((res: ITaches[]) => (this.taches = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(technicien: ITechnicien) {
    this.editForm.patchValue({
      id: technicien.id,
      nom: technicien.nom,
      prenom: technicien.prenom,
      datedenaissance: technicien.datedenaissance,
      specialite: technicien.specialite,
      email: technicien.email,
      domaine: technicien.domaine
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const technicien = this.createFromForm();
    if (technicien.id !== undefined) {
      this.subscribeToSaveResponse(this.technicienService.update(technicien));
    } else {
      this.subscribeToSaveResponse(this.technicienService.create(technicien));
    }
  }

  private createFromForm(): ITechnicien {
    return {
      ...new Technicien(),
      id: this.editForm.get(['id']).value,
      nom: this.editForm.get(['nom']).value,
      prenom: this.editForm.get(['prenom']).value,
      datedenaissance: this.editForm.get(['datedenaissance']).value,
      specialite: this.editForm.get(['specialite']).value,
      email: this.editForm.get(['email']).value,
      domaine: this.editForm.get(['domaine']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITechnicien>>) {
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

  trackAlertesById(index: number, item: IAlertes) {
    return item.id;
  }

  trackTachesById(index: number, item: ITaches) {
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
