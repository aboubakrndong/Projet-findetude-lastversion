import { Moment } from 'moment';
import { ITechnicien } from 'app/shared/model/technicien.model';
import { IBts } from 'app/shared/model/bts.model';

export interface IAlertes {
  id?: number;
  destinataire?: string;
  details?: string;
  date?: Moment;
  techniciens?: ITechnicien[];
  bts?: IBts;
}

export class Alertes implements IAlertes {
  constructor(
    public id?: number,
    public destinataire?: string,
    public details?: string,
    public date?: Moment,
    public techniciens?: ITechnicien[],
    public bts?: IBts
  ) {}
}
