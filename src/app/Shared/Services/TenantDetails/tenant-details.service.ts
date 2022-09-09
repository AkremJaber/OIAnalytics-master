import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TenantDetails } from '../../Models/TenantDetails/tenant-details.model';
import { lastValueFrom, Observable } from 'rxjs';
import { Dashboard } from '../../Models/Dashboard/dashboard.model';
import { Report } from '../../Models/Report/report.model';
import { DataSet } from '../../Models/DataSet/data-set.model';

@Injectable({
  providedIn: 'root'
})
export class TenantDetailsService {

  
  constructor(private http: HttpClient) { }
  list: TenantDetails[];
  readonly getTenant= 'https://localhost:44361/api/TenantDetails';
  
  formData:TenantDetails = new TenantDetails();
  dashboard:Dashboard
  report:Report
  dataset:DataSet
  

  getTenantDetail(id:string){
    return this.http.get(this.getTenant+'/'+id)
  }

  // getDashRepDs(id:string){
  //   this.list =  lastValueFrom(this.getTenantDetail(id))
  //   this.list.forEach(async thp =>{
  //     this.dashboard = new Dashboard()
      
  //     this.report= new Report()

  //     this.dataset= new DataSet()

  //     this.tenanthasperson=new TenantsHasPersons()

  //     let uidPerson=thp.ccC_UIDPerson
  //     this.person = await lastValueFrom(this.personService.getPersonByuid(uidPerson))
  //     let PersonCentralAcc=this.person.centralAccount 

  //     let uidTenant=thp.ccC_UIDTenant
  //     this.tenant = await lastValueFrom(this.tenantService.getTenantbyUID(uidTenant))
  //     let Tenant_ccC_Name=this.tenant.ccC_Name

  //     let uidTenantHasPerson=thp.uiD_CCCTenantsHasPersons;
  //     this.tenanthasperson=await lastValueFrom(this.getTHPbyUID(uidTenantHasPerson))
  //     let uiD_CCCTenantsHasPersons=this.tenanthasperson.uiD_CCCTenantsHasPersons

  //     let thpdto = {PersonCentralAcc:PersonCentralAcc,Tenant_ccC_Name:Tenant_ccC_Name,uid_person:uidPerson,uid_tenant:uidTenant,uiD_CCCTenantsHasPersons:uidTenantHasPerson}
  //     this.TenantHasPersonDtoList.push(thpdto)
  //   })


  // }
  
}
