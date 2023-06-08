import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from '../service/localstorage.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  id:any;
  modal:any
  formid:any;
  formname:string;
  contact:any[];
  constructor(public local:LocalstorageService) { }

  ngOnInit(): void {
    this.id=this.local.fngetLocalValueforId();
    this.contact = this.local.getContactRecords();
    console.log(this.contact);
    
  }
  saveContact(){
    console.log(this.formid,this.formname);
    this.modal=false;
    let contact =
    {
      id:this.formid,
      name:this.formname
    }
    this.local.addContactRecord(contact);
    this.contact = this.local.getContactRecords();
    this.formid="";
    this.formname="";
  }
}
