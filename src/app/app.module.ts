import { HttpClientModule } from '@angular/common/http';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule,routingComponent } from './app-routing.module';
import { AppComponent } from './app.component';
import { TenantsComponent } from './Tenant/tenants/tenants.component';
import { TenantsHasPersonsComponent } from './TenantHasPersons/tenants-has-persons/tenants-has-persons.component';
import { DpMultiComponent } from './dp-multi/dp-multi.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule } from '@angular/forms';
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
    TestComponent

     
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
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AppModule { }
