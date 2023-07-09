import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {CheckboxModule} from 'primeng-lts/checkbox';
import { AuthlogService } from '../service/authlog.service';
import { LocalstorageService } from '../service/localstorage.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email:string;
  id:any;
  password:string;
  name:string;
  showid:boolean=false;
  constructor(public router:Router,private location: Location,public authlog:AuthlogService,public local:LocalstorageService,public changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    if(!!this.local.fngetLocalValueforName()){
      this.local.fnclearAll();
      // this.location.back();
    }
  }
  loginUser(){
    if(this.name == undefined || this.name ==null){
      this.name = this.createName();
    }
    this.local.fnsetLocalValueforName(this.name);
    console.log(this.name,'name');
    this.router.navigate(['/conversation'])
  }
  createName(){
   const Names = ['Ahmed','Ibrahim', 'Abdullah', 'Muhammad', 'Rafique', 'Mubashir', 'Musa','Abrar','Mussadik','Sharique','Musab','AburRehman']; 
   var name1 = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r',
    's','t','u','v','w','x','y','z']
    var name2 = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S',
    'T','U','V','W','X','Y','Z']
    let name3 = [1,2,3,4,5,6,7,8,9,0,11,0o12]
    
    var named =  Names[Math.floor(Math.random() * Names.length)];
    var firstName = name3[Math.floor(Math.random() * name3.length)];
    var lastName = name2[Math.floor(Math.random() * name2.length)];
    let finalname=named+firstName;
    while (this.isUniqueIdExists(finalname)) {
      finalname = finalname+lastName
    }
    return finalname;
  }

  setIdtoStorage(){
    this.showid=true
    this.id = this.getRandomUniqueId();
    this.local.fnsetLocalValueforId(this.id);
    this.changeDetectorRef.detectChanges();
    this.router.navigate(['/dashboard'])
  }
  getRandomUniqueId(): number {
    let uniqueId = Math.round(Math.random() * Math.pow(10, 10));
    while (this.isUniqueIdExists(uniqueId)) {
      uniqueId = Math.round(Math.random() * Math.pow(10, 10));
    }
    return uniqueId;
  }

  isUniqueIdExists(uniqueId): boolean {
    const storedId = localStorage.getItem('name');
    return storedId && storedId === uniqueId.toString();
  }
}
