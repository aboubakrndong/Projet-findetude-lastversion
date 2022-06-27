import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IKpi } from 'app/shared/model/kpi.model';

type EntityResponseType = HttpResponse<IKpi>;
type EntityArrayResponseType = HttpResponse<IKpi[]>;

@Injectable({ providedIn: 'root' })
export class KpiService {
  public resourceUrl = SERVER_API_URL + 'api/kpis';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/kpis';

  constructor(protected http: HttpClient) {}

  create(kpi: IKpi): Observable<EntityResponseType> {
    return this.http.post<IKpi>(this.resourceUrl, kpi, { observe: 'response' });
  }

  update(kpi: IKpi): Observable<EntityResponseType> {
    return this.http.put<IKpi>(this.resourceUrl, kpi, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IKpi>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IKpi[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IKpi[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
