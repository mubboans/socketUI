import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContactComponent } from './contact/contact.component';
import { ConservationComponent } from './conservation/conservation.component';


const routes: Routes = [
{path:'login',component:LoginComponent},
{path:'home',component:HomeComponent},
{path:'dashboard',component:DashboardComponent},
{path:'conversation',component:ConservationComponent},
{path:'contact',component:ContactComponent},
{path:'',pathMatch:'full',redirectTo:'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
