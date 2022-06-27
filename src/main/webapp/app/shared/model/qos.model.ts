import { IZones } from 'app/shared/model/zones.model';

export interface IQos {
  id?: number;
  traffic?: string;
  tempsdereponse?: string;
  sensibilite?: string;
  debit?: string;
  zones?: IZones;
}

export class Qos implements IQos {
  constructor(
    public id?: number,
    public traffic?: string,
    public tempsdereponse?: string,
    public sensibilite?: string,
    public debit?: string,
    public zones?: IZones
  ) {}
}
