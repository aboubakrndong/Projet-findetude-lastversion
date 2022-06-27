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
export class SidebarService {
  public resourceUrl = SERVER_API_URL + 'api/taches';

  constructor(protected http: HttpClient) {}
}
