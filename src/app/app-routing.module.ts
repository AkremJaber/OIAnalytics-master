import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DpMultiComponent } from './dp-multi/dp-multi.component';
import { TenantDetailsComponent } from './tenant-details/tenant-details.component';
import { TenantsComponent } from './Tenant/tenants/tenants.component';
import { TenantsHasPersonsComponent } from './TenantHasPersons/tenants-has-persons/tenants-has-persons.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
{path:'tenant',component:TenantsComponent},
{path:'AssignPersonTenant',component:DpMultiComponent},
{path:'test',component:TestComponent},
{path:'OIAnalytics',component:AppComponent},
{path:'TenantDetails',component:TenantDetailsComponent},




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponent = [TenantsComponent, TenantsHasPersonsComponent]
