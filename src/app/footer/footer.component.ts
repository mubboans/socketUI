import { Component, OnInit } from '@angular/core';
import { Expo } from '../home/home.component';
import { AuthlogService } from '../service/authlog.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(public auth:AuthlogService) { }
  data:Expo[]
  ngOnInit(): void {
    this.auth.getProducts().subscribe(x=>{
      this.data = x 
      console.log(x,this.data)
    })
  }

}
