import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IZones, Zones } from 'app/shared/model/zones.model';
import { ZonesService } from './zones.service';

@Component({
  selector: 'jhi-zones-update',
  templateUrl: './zones-update.component.html'
})
export class ZonesUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    nomzone: [],
    couverture: [],
    cadastre: [],
    population: []
  });

  constructor(protected zonesService: ZonesService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ zones }) => {
      this.updateForm(zones);
    });
  }

  updateForm(zones: IZones) {
    this.editForm.patchValue({
      id: zones.id,
      nomzone: zones.nomzone,
      couverture: zones.couverture,
      cadastre: zones.cadastre,
      population: zones.population
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const zones = this.createFromForm();
    if (zones.id !== undefined) {
      this.subscribeToSaveResponse(this.zonesService.update(zones));
    } else {
      this.subscribeToSaveResponse(this.zonesService.create(zones));
    }
  }

  private createFromForm(): IZones {
    return {
      ...new Zones(),
      id: this.editForm.get(['id']).value,
      nomzone: this.editForm.get(['nomzone']).value,
      couverture: this.editForm.get(['couverture']).value,
      cadastre: this.editForm.get(['cadastre']).value,
      population: this.editForm.get(['population']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IZones>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
