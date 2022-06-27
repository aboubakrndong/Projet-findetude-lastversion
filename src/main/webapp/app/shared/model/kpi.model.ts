import { IZones } from 'app/shared/model/zones.model';

export interface IKpi {
  id?: number;
  tauxdappels?: string;
  tauxdepertes?: string;
  tauxderejets?: string;
  zones?: IZones;
}

export class Kpi implements IKpi {
  constructor(
    public id?: number,
    public tauxdappels?: string,
    public tauxdepertes?: string,
    public tauxderejets?: string,
    public zones?: IZones
  ) {}
}
