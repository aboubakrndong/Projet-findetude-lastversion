import { Moment } from 'moment';
import { IAlertes } from 'app/shared/model/alertes.model';
import { ITaches } from 'app/shared/model/taches.model';

export interface ITechnicien {
  id?: number;
  nom?: string;
  prenom?: string;
  datedenaissance?: Moment;
  specialite?: string;
  email?: string;
  domaine?: string;
  alertes?: IAlertes[];
  taches?: ITaches[];
}

export class Technicien implements ITechnicien {
  constructor(
    public id?: number,
    public nom?: string,
    public prenom?: string,
    public datedenaissance?: Moment,
    public specialite?: string,
    public email?: string,
    public domaine?: string,
    public alertes?: IAlertes[],
    public taches?: ITaches[]
  ) {}
}
