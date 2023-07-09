import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
  name:string;
  backgroundClasses: string[] = ['bg-blue-50', 'bg-purple-50', 'bg-green-50', 'bg-teal-50'];
  constructor(public local:LocalstorageService,public change:ChangeDetectorRef) { }

  ngOnInit(): void {
    this.name= this.local.fngetLocalValueforName();
    console.log(this.name,'namein contact');
    
    this.id=this.local.fngetLocalValueforId();
    this.contact = this.local.getContactRecords();
    console.log(this.contact);
    
  }
  getBackgroundClass(index: number): string {
    return this.backgroundClasses[index % this.backgroundClasses.length];
  }
  saveContact(){
    console.log(this.formid,this.formname);
    
    let contact =
    {
      id:this.getRandomUniqueId(),
      name:this.formname,
      time:new Date()
    }
    this.local.addContactRecord(contact);
    this.contact = this.local.getContactRecords();
    this.change.detectChanges();
    this.formid="";
    this.formname="";
    this.modal=false;
  }
  getRandomUniqueId(): number {
    let uniqueId = Math.round(Math.random() * Math.pow(6, 6));
    // while (this.isUniqueIdExists(uniqueId)) {
      uniqueId = Math.round(Math.random() * Math.pow(6, 6));
    // }
    return uniqueId;
  }
}
