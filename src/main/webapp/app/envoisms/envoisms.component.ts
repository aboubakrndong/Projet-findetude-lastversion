import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'jhi-envoisms',
  templateUrl: './envoisms.component.html',
  styleUrls: ['./envoisms.component.scss']
})
export class EnvoismsComponent implements OnInit {

  dest = 'Aboubakr';

  onSubmit(form: NgForm) {
    const message = form.value['msg'];
    const destinataire = form.value['destina'];

    window.open('http://localhost:13013/cgi-bin/sendsms?username=tester&password=foobar&to=' + destinataire + '&text=' + message);
  }
  constructor(private modalService: NgbModal) {}

  ngOnInit() {}

  onClose() {
    this.onClose();
  }
}
