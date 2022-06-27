import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { ZonesService } from 'app/entities/zones';
import { IZones } from 'app/shared/model/zones.model';
import { IQos } from 'app/shared/model/qos.model';
import { IKpi } from 'app/shared/model/kpi.model';
import { IBts } from 'app/shared/model/bts.model';

import { MatDialog } from '@angular/material/dialog';

import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

import * as html2canvas from 'html2canvas';
import { PopupComponent } from 'app/popup/popup.component';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EnvoismsComponent } from 'app/envoisms/envoisms.component';

export interface PeriodicElement {
  id?: number;
  nomzone?: string;
  couverture?: string;
  cadastre?: string;
  population?: string;
  qos?: IQos[];
  kpis?: IKpi[];
  bts?: IBts[];
}

@Component({
  selector: 'jhi-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  listzone: IZones[];
  ELEMENT_DATA: PeriodicElement[];
  zone: IZones;
  selectedValue: number;
  displayedColumns: string[] = ['nomzone', 'couverture', 'cadastre', 'population'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  constructor(public dialog: MatDialog, private zoneService: ZonesService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.listzone = new Array<IZones>();
    this.zoneService.findAll().subscribe(liste => {
      console.log(liste.body);
      this.listzone = liste.body;
    });
  }
  getZoneById(event: any) {
    this.zoneService.find(this.selectedValue).subscribe(zone => {
      console.log(zone);
      this.zone = zone.body;
      this.ELEMENT_DATA = [
        {
          id: this.zone.id,
          nomzone: this.zone.nomzone,
          couverture: this.zone.couverture,
          cadastre: this.zone.cadastre,
          population: this.zone.population,
          qos: this.zone.qos,
          kpis: this.zone.kpis,
          bts: this.zone.bts
        }
      ];
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    });
  }

  ConvertDataToPdf() {
    var data = document.getElementById('contentToConvert');
    const html2canvas = require('C:/Users/A754779/Documents/Jhipster project/projetfindetudefinalversion/node_modules/html2canvas');

    html2canvas(data).then(canvas => {
      var imgWidth = 105;
      var pageHeight = 120;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jsPDF('p', 'mm', 'a4');
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('File.pdf');
    });
  }

  ShareData() {
    const modalRef: NgbModalRef = this.modalService.open(PopupComponent, { windowClass: 'create-modal', centered: true });
    modalRef.componentInstance.zone = this.zone;
  }

  SendAlert() {
    const dialogRef = this.dialog.open(EnvoismsComponent, {
      width: '450px',
      height: '350px'
    });
  }
}
