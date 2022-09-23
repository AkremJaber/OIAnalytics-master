import { HttpClientModule } from '@angular/common/http';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule,routingComponent } from './app-routing.module';
import { AppComponent } from './app.component';
import { TenantsComponent } from './Tenant/tenants/tenants.component';
import { TenantsHasPersonsComponent } from './TenantHasPersons/tenants-has-persons/tenants-has-persons.component';
import { DpMultiComponent } from './dp-multi/dp-multi.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { TenantDetailsComponent } from './tenant-details/tenant-details.component';
import { RouterModule, Routes } from '@angular/router';
import { TenantRDDComponent } from './tenant-rdd/tenant-rdd.component';
import { PowerBIEmbedModule } from '../../powerbi-client-angular/src/powerbi-embed.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {MatInputModule} from '@angular/material/input';
import { SidenavbarComponent } from './sidenavbar/sidenavbar.component';
import { TestComponent } from './test/test.component';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatFormFieldModule} from '@angular/material/form-field';
import { DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { 
	IgxDropDownModule,
	IgxIconModule,
	IgxNavbarModule,
	IgxButtonModule,
	IgxToggleModule
 } from "igniteui-angular";
 import { enableRipple } from '@syncfusion/ej2-base';
 import {MatDialogModule} from '@angular/material/dialog';
 import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PopupComponent } from './popup/popup.component';
import { DatePipe } from '@angular/common';
import { CreatePopupComponent } from './create-popup/create-popup.component';
import { ReportEmbedComponent } from './report-embed/report-embed.component';
import { DashboardEmbedComponent } from './dashboard-embed/dashboard-embed.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule} from '@angular/material/card';
import { DashboardsComponent } from './dashboards/dashboards.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatStepperModule} from '@angular/material/stepper';



 enableRipple(true);
@NgModule({
  declarations: [
    AppComponent,
    TenantsComponent,
    TenantsHasPersonsComponent,
    DpMultiComponent,
    TenantDetailsComponent,
    TenantRDDComponent,
    HeaderComponent,
    FooterComponent,
    SidenavbarComponent,
    TestComponent,
    PopupComponent,
    CreatePopupComponent,
    ReportEmbedComponent,
    DashboardEmbedComponent,
    DashboardsComponent

    

     
  ],
  imports: [
    NgMultiSelectDropDownModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatSidenavModule,
    MatInputModule,
    MatButtonModule,
    PowerBIEmbedModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatFormFieldModule,
    DropDownButtonModule,
    IgxDropDownModule,
	  IgxIconModule,
	  IgxNavbarModule,
	  IgxButtonModule,
	  IgxToggleModule,
    MatDialogModule,
    NgbModule,
    FlexLayoutModule,
    MatCardModule,
    MatTabsModule,
    MatListModule,
    MatIconModule,
    MatStepperModule,
    ReactiveFormsModule 
    
    

  ],
  providers: [DatePipe, TenantDetailsComponent,],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
