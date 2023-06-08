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
  showid:boolean=false;
  constructor(public router:Router,private location: Location,public authlog:AuthlogService,public local:LocalstorageService,public changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    if(!!this.local.fngetLocalValueforId()){
      this.location.back();
    }
  }
  loginUser(){
    const d={
      email:this.email,
      password:this.password
    }
    console.log(this.email,this.password,"value Check",JSON.stringify(d));
    this.authlog.fnLogUser(d).subscribe(x=>{
      console.log(x);
    })
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

  isUniqueIdExists(uniqueId: number): boolean {
    const storedId = localStorage.getItem('id');
    return storedId && storedId === uniqueId.toString();
  }
}
