import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITechnicien } from 'app/shared/model/technicien.model';

type EntityResponseType = HttpResponse<ITechnicien>;
type EntityArrayResponseType = HttpResponse<ITechnicien[]>;

@Injectable({ providedIn: 'root' })
export class TechnicienService {
  public resourceUrl = SERVER_API_URL + 'api/techniciens';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/techniciens';

  constructor(protected http: HttpClient) {}

  create(technicien: ITechnicien): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(technicien);
    return this.http
      .post<ITechnicien>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(technicien: ITechnicien): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(technicien);
    return this.http
      .put<ITechnicien>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ITechnicien>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ITechnicien[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ITechnicien[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  protected convertDateFromClient(technicien: ITechnicien): ITechnicien {
    const copy: ITechnicien = Object.assign({}, technicien, {
      datedenaissance:
        technicien.datedenaissance != null && technicien.datedenaissance.isValid() ? technicien.datedenaissance.format(DATE_FORMAT) : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.datedenaissance = res.body.datedenaissance != null ? moment(res.body.datedenaissance) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((technicien: ITechnicien) => {
        technicien.datedenaissance = technicien.datedenaissance != null ? moment(technicien.datedenaissance) : null;
      });
    }
    return res;
  }

  // fonction findAll qui renvoie la liste des technicien

  findAll(): Observable<EntityArrayResponseType> {
    return this.http.get<ITechnicien[]>(`${this.resourceUrl}`, { observe: 'response' });
  }

  //fin de la fonction findAll
}
