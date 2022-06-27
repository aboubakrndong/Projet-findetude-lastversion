import { IQos } from 'app/shared/model/qos.model';
import { IKpi } from 'app/shared/model/kpi.model';
import { IBts } from 'app/shared/model/bts.model';

export interface IZones {
  id?: number;
  nomzone?: string;
  couverture?: string;
  cadastre?: string;
  population?: string;
  qos?: IQos[];
  kpis?: IKpi[];
  bts?: IBts[];
}

export class Zones implements IZones {
  constructor(
    public id?: number,
    public nomzone?: string,
    public couverture?: string,
    public cadastre?: string,
    public population?: string,
    public qos?: IQos[],
    public kpis?: IKpi[],
    public bts?: IBts[]
  ) {}
}
