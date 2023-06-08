import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {
    contactstorage='contact';
    conversationstorage='conversation';
    messagestorage = 'message';
  constructor(public router:Router) { }
  fnsetLocalValueforId(value){
    localStorage.setItem('id',value);
  }

  fngetLocalValueforId(){
    return localStorage.getItem('id');
  }

  fnsetValueForContact(value){
    localStorage.setItem(this.contactstorage,value);
  }

  getContactRecords(): any[] {
    const recordsJson = localStorage.getItem(this.contactstorage);
    return recordsJson ? JSON.parse(recordsJson) : [];
  }

  addContactRecord(record: any): void {
    const records = this.getContactRecords();
    records.push(record);
    localStorage.setItem(this.contactstorage, JSON.stringify(records));
  }

  getConversationRecord(): any[]{
    const recordsJson = localStorage.getItem(this.conversationstorage);
    return recordsJson ? JSON.parse(recordsJson) : [];
  }

  addConversationRecords(record){
    const records = this.getConversationRecord();
    records.push(record);
    localStorage.setItem(this.conversationstorage, JSON.stringify(records));
  }

  getMessageRecord():any[]{
    const recordsJson = localStorage.getItem(this.messagestorage);
    return recordsJson ? JSON.parse(recordsJson) : [];
  }

  addMessageRecords(value){
    const records = this.getMessageRecord();
    records.push(value);
    localStorage.setItem(this.messagestorage, JSON.stringify(records));
  }


  fnclearcontactlocal(){
    localStorage.removeItem(this.contactstorage);
    localStorage.clear();
  }
  fnClearconversationLocal(){
    localStorage.removeItem(this.conversationstorage);
    localStorage.clear();
  }

  fnclearAll(){
    localStorage.removeItem("id");
    localStorage.removeItem(this.contactstorage);
    localStorage.removeItem(this.conversationstorage);
    localStorage.removeItem(this.messagestorage);
    localStorage.clear();
    this.router.navigate(['/login'])
  }
}



