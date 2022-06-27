import { Moment } from 'moment';
import { ITechnicien } from 'app/shared/model/technicien.model';

export interface ITaches {
  id?: number;
  type?: string;
  datededebut?: Moment;
  datedefin?: Moment;
  techniciens?: ITechnicien[];
}

export class Taches implements ITaches {
  constructor(
    public id?: number,
    public type?: string,
    public datededebut?: Moment,
    public datedefin?: Moment,
    public techniciens?: ITechnicien[]
  ) {}
}
