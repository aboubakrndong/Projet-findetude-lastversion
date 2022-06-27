import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITaches } from 'app/shared/model/taches.model';

type EntityResponseType = HttpResponse<ITaches>;
type EntityArrayResponseType = HttpResponse<ITaches[]>;

@Injectable({ providedIn: 'root' })
export class TachesService {
  public resourceUrl = SERVER_API_URL + 'api/taches';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/taches';

  constructor(protected http: HttpClient) {}

  create(taches: ITaches): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(taches);
    return this.http
      .post<ITaches>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(taches: ITaches): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(taches);
    return this.http
      .put<ITaches>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ITaches>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ITaches[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ITaches[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  protected convertDateFromClient(taches: ITaches): ITaches {
    const copy: ITaches = Object.assign({}, taches, {
      datededebut: taches.datededebut != null && taches.datededebut.isValid() ? taches.datededebut.format(DATE_FORMAT) : null,
      datedefin: taches.datedefin != null && taches.datedefin.isValid() ? taches.datedefin.format(DATE_FORMAT) : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.datededebut = res.body.datededebut != null ? moment(res.body.datededebut) : null;
      res.body.datedefin = res.body.datedefin != null ? moment(res.body.datedefin) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((taches: ITaches) => {
        taches.datededebut = taches.datededebut != null ? moment(taches.datededebut) : null;
        taches.datedefin = taches.datedefin != null ? moment(taches.datedefin) : null;
      });
    }
    return res;
  }
}
