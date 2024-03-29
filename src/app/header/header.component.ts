import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng-lts/api/menuitem';
import {TabMenuModule} from 'primeng-lts/tabmenu';
import {MenubarModule} from 'primeng-lts/menubar';
import { Route, Router } from '@angular/router';
import { LocalstorageService } from '../service/localstorage.service';
import { CommonService } from '../service/common.service';
import { ThemeselectionService } from '../service/themeselection.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public router:Router,public local:LocalstorageService,public com:CommonService,public theme:ThemeselectionService) { }
  items: MenuItem[];
  menuitem: MenuItem[];
  id:any;
  name:string;
  activeItem: MenuItem;
  selectedCity1:string;
  cities: any[];
  ngOnInit(): void {
    this.id= this.local.fngetLocalValueforId();
    this.name=this.local.fngetLocalValueforName();
    this.com.connecttoSocket(this.name);
    
    this.com.recieveMessage();
    this.cities = [
        {name: 'New York', code: 'NY'},
        {name: 'Rome', code: 'RM'},
        {name: 'London', code: 'LDN'},
        {name: 'Istanbul', code: 'IST'},
        {name: 'Paris', code: 'PRS'}
    ];
    this.items = [
      {
        label:'Conservation',  
        routerLink:'/conversation'    
    },
    {
        label:'Contact',
        routerLink:'/contact'  
    },
    {
      label:'Change Theme',
      items:[
          {
              label:'Light',
              command:()=>{this.changeTheme('saga-blue')}, 
              icon:'pi pi-circle-off'
          },
          {
              label:'Dark',
              icon:'pi pi-circle-on',
              command:()=>{this.changeTheme('vela-blue')},
          },
          
      ]
    }
  ];
  this.menuitem = [
    {label: 'lingerie', icon: 'pi pi-fw pi-home'},
    {label: 'sleepwwear', icon: 'pi pi-fw pi-calendar'},
    {label: 'robes', icon: 'pi pi-fw pi-pencil'},
    {label: 'swimwear & coverups', icon: 'pi pi-fw pi-file'},
    {label: 'stocking & hosiery', icon: 'pi pi-fw pi-cog'},
    {label: 'satin', icon: 'pi pi-apple'},
    {label: 'plus size', icon: 'pi pi-fw pi-book'},
    {label: 'loungewear', icon: 'pi pi-fw pi-thumbs-up'},
];
  }
  changeTheme(themecolor){
    console.log(themecolor);
    
    this.theme.switchTheme(themecolor);
  }
fnLogout(){
  console.log('logout');
this.local.fnclearAll();
}
}
