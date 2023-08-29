import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {DataViewModule} from 'primeng-lts/dataview';
import {MenubarModule} from 'primeng-lts/menubar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import {TooltipModule} from 'primeng-lts/tooltip'; 
import {TabMenuModule} from 'primeng-lts/tabmenu';
import {CarouselModule} from 'primeng-lts/carousel';
import {DynamicDialogModule} from 'primeng-lts/dynamicdialog';
import {ToastModule} from 'primeng-lts/toast';
import {CalendarModule} from 'primeng-lts/calendar';
import {SliderModule} from 'primeng-lts/slider';
import {ContextMenuModule} from 'primeng-lts/contextmenu';
import {DialogModule} from 'primeng-lts/dialog';
import {ButtonModule} from 'primeng-lts/button';
import {ProgressBarModule} from 'primeng-lts/progressbar';
import {InputTextModule} from 'primeng-lts/inputtext';
import {CheckboxModule} from 'primeng-lts/checkbox';
import {FileUploadModule} from 'primeng-lts/fileupload';
import {ToolbarModule} from 'primeng-lts/toolbar';
import {RatingModule} from 'primeng-lts/rating';
import {RadioButtonModule} from 'primeng-lts/radiobutton';
import {InputNumberModule} from 'primeng-lts/inputnumber';
import { ConfirmDialogModule } from 'primeng-lts/confirmdialog';
import {InputSwitchModule} from 'primeng-lts/inputswitch';
import { InputTextareaModule } from 'primeng-lts/inputtextarea'; 
import { SelectButtonModule } from 'primeng-lts/selectbutton';
import {TagModule} from 'primeng-lts/tag';
import {InputMaskModule} from 'primeng-lts/inputmask';
import {CardModule} from 'primeng-lts/card';
import {RippleModule} from 'primeng-lts/ripple';
import {AvatarModule} from 'primeng-lts/avatar';
import {TabViewModule} from 'primeng-lts/tabview';
import { TimelineModule } from "primeng-lts/timeline";
import {DropdownModule} from 'primeng-lts/dropdown';


import {ProgressSpinnerModule} from 'primeng-lts/progressspinner';
import {MenuModule} from 'primeng-lts/menu';
import {MenuItem} from 'primeng-lts/api';
import {ToggleButtonModule} from 'primeng-lts/togglebutton';
import {AccordionModule} from 'primeng-lts/accordion';
import {TieredMenuModule} from 'primeng-lts/tieredmenu';
import {FieldsetModule} from 'primeng-lts/fieldset';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtInterceptor } from './service/jwt.interceptor';
import {ListboxModule} from 'primeng-lts/listbox';
import {MultiSelectModule} from 'primeng-lts/multiselect';
import { ChipModule } from 'primeng-lts/chip';
import { ConfirmationService } from 'primeng-lts/api';
import { MessageService } from 'primeng-lts/api';
import {TableModule} from 'primeng-lts/table';
import { ConservationComponent } from './conservation/conservation.component';
import { ContactComponent } from './contact/contact.component';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    ConservationComponent,
    ContactComponent,
    DashboardComponent,

  ],
  imports: [
    ChipModule,
    ListboxModule,
    BrowserModule,
    TableModule,
    MultiSelectModule,
    DataViewModule,
    BrowserAnimationsModule,
    HttpClientModule,
    DropdownModule,
   CheckboxModule,
    TabMenuModule,
    AppRoutingModule,
    MenubarModule,
    TieredMenuModule,
    ButtonModule,
    FieldsetModule,
    CommonModule,
    FormsModule,
    CheckboxModule,
    HttpClientModule,
    ReactiveFormsModule,
    InputSwitchModule,
    MenuModule,
    CardModule,
    CarouselModule,
    TooltipModule,


    CalendarModule,
		SliderModule,
		DialogModule,

		ContextMenuModule,
    FormsModule,
		ButtonModule,
		ToastModule,
    InputTextModule,
    ProgressBarModule,
    CheckboxModule,    
    FileUploadModule,
    ToolbarModule,
    RatingModule,
    FormsModule,
    RadioButtonModule,
    InputNumberModule,
    ConfirmDialogModule,
    InputTextareaModule,
    SelectButtonModule,
    TagModule,
    InputMaskModule,
    DynamicDialogModule,
    RippleModule,

    AvatarModule,
    TabViewModule,
    TimelineModule,

    ProgressSpinnerModule,
    ToggleButtonModule,
    AccordionModule,
    
  ],
  providers: [
    DatePipe,
    MessageService,ConfirmationService,
    {provide: HTTP_INTERCEPTORS,useClass:JwtInterceptor, multi:true}
    
  ],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
