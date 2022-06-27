import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IBts } from 'app/shared/model/bts.model';

type EntityResponseType = HttpResponse<IBts>;
type EntityArrayResponseType = HttpResponse<IBts[]>;

@Injectable({ providedIn: 'root' })
export class BtsService {
  public resourceUrl = SERVER_API_URL + 'api/bts';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/bts';

  constructor(protected http: HttpClient) {}

  create(bts: IBts): Observable<EntityResponseType> {
    return this.http.post<IBts>(this.resourceUrl, bts, { observe: 'response' });
  }

  update(bts: IBts): Observable<EntityResponseType> {
    return this.http.put<IBts>(this.resourceUrl, bts, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IBts>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IBts[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IBts[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  findAll(): Observable<EntityArrayResponseType> {
    return this.http.get<IBts[]>(`${this.resourceUrl}`, { observe: 'response' });
  }
}
