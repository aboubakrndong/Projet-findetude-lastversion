import { IAlertes } from 'app/shared/model/alertes.model';
import { IZones } from 'app/shared/model/zones.model';

export interface IBts {
  id?: number;
  type?: string;
  puissance?: string;
  etat?: string;
  alertes?: IAlertes[];
  zones?: IZones;
}

export class Bts implements IBts {
  constructor(
    public id?: number,
    public type?: string,
    public puissance?: string,
    public etat?: string,
    public alertes?: IAlertes[],
    public zones?: IZones
  ) {}
}
