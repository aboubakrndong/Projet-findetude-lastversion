import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IQos } from 'app/shared/model/qos.model';

type EntityResponseType = HttpResponse<IQos>;
type EntityArrayResponseType = HttpResponse<IQos[]>;

@Injectable({ providedIn: 'root' })
export class QosService {
  public resourceUrl = SERVER_API_URL + 'api/qos';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/qos';

  constructor(protected http: HttpClient) {}

  create(qos: IQos): Observable<EntityResponseType> {
    return this.http.post<IQos>(this.resourceUrl, qos, { observe: 'response' });
  }

  update(qos: IQos): Observable<EntityResponseType> {
    return this.http.put<IQos>(this.resourceUrl, qos, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IQos>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IQos[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IQos[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
