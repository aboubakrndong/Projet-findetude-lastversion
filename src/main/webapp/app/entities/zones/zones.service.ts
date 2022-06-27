import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IZones } from 'app/shared/model/zones.model';

type EntityResponseType = HttpResponse<IZones>;
type EntityArrayResponseType = HttpResponse<IZones[]>;

@Injectable({ providedIn: 'root' })
export class ZonesService {
  public resourceUrl = SERVER_API_URL + 'api/zones';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/zones';

  constructor(protected http: HttpClient) {}

  create(zones: IZones): Observable<EntityResponseType> {
    return this.http.post<IZones>(this.resourceUrl, zones, { observe: 'response' });
  }

  update(zones: IZones): Observable<EntityResponseType> {
    return this.http.put<IZones>(this.resourceUrl, zones, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IZones>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IZones[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IZones[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  //je cree la fonction findAll qui renvoie la liste des zones

  findAll(): Observable<EntityArrayResponseType> {
    return this.http.get<IZones[]>(`${this.resourceUrl}`, { observe: 'response' });
  }

  //fin de la fonction findAll
}
