import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TechnicienService } from 'app/entities/technicien';
import { AlertesService } from 'app/entities/alertes';
import { BtsService } from 'app/entities/bts';
import { ITechnicien } from 'app/shared/model/technicien.model';
import { IAlertes } from 'app/shared/model/alertes.model';
import { IBts } from 'app/shared/model/bts.model';

@Component({
  selector: 'jhi-createalerte',
  templateUrl: './createalerte.component.html',
  styleUrls: ['./createalerte.component.scss']
})
export class CreatealerteComponent implements OnInit {
  selectedValue: number;
  selectedValueTech: number;
  selectedValuebts: number;
  listtechnicien: ITechnicien[];
  listdesbts: IBts[];
  technicien: ITechnicien;
  bts: IBts;
  alerte: IAlertes;
  userFormGroup: FormGroup;

  constructor(private btsService: BtsService, private technicienService: TechnicienService, private alertesService: AlertesService) {}

  ngOnInit(): void {
    this.userFormGroup = new FormGroup({
      nomzone: new FormControl(''),
      nom: new FormControl(''),
      madescription: new FormControl('')
    });
    //charge liste techniciens
    this.listtechnicien = new Array<ITechnicien>();
    this.technicienService.findAll().subscribe(listtech => {
      console.log(listtech.body);
      this.listtechnicien = listtech.body;
    });
    //fin charge liste techniciens

    //charge liste Bts

    this.listdesbts = new Array<IBts>();
    this.btsService.findAll().subscribe(listbts => {
      console.log(listbts.body);
      this.listdesbts = listbts.body;
    });
    //fin charge liste bts
  }

  addAlerte() {
    this.alertesService.create(this.userFormGroup.value).subscribe(alerte => {
      console.log(alerte);
      this.alerte = alerte.body;
      alert('alertes créer avec succés');
    });
  }
}
