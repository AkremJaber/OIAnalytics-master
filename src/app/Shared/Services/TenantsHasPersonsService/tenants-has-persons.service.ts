import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { lastValueFrom, Observable } from 'rxjs';
import { Person } from '../../Models/Person/person.model';
import { Tenant } from '../../Models/Tenant/tenant.model';
import { TenantsHasPersons } from '../../Models/TenantsHasPersons/tenants-has-persons.model';
import { PersonService } from '../PersonService/person.service';
import { TenantService } from '../TenantService/tenant.service';

@Injectable({
  providedIn: 'root'
})
export class TenantsHasPersonsService {

  constructor(private http: HttpClient,private personService:PersonService,private tenantService:TenantService) { }

  readonly baseURL = 'https://localhost:44361/api/TenantsHasPersons';
  readonly getTenant= 'https://localhost:44361/api/Tenants';
  readonly delTHP='https://localhost:44361/api/TenantsHasPersons';
  formData:TenantsHasPersons = new TenantsHasPersons();

  list: TenantsHasPersons[];
  tenant: Tenant;
  person: Person;
  tenanthasperson: TenantsHasPersons;

  TenantHasPersonDtoList:any= [];
  
  
  
  
  getTenantsHasPersons():Observable<TenantsHasPersons[]>{
    return this.http.get<TenantsHasPersons[]>(this.baseURL)
  }
  getTHPbyUID(id:string):any{
    return this.http.get<TenantsHasPersons>(this.delTHP+'/'+id)
  }
  // getTHPbyUID(id:string):any{
  // return this.http.get<TenantsHasPersons>(this.delTHP+id)
  // }
  // getTenantbyUID(id:string):any{
  //   return this.http.get<Tenant>(this.getTenant+'/'+id)
  // }
 async refreshList(){
  
  this.list = await lastValueFrom(this.getTenantsHasPersons())
    this.list.forEach(async thp =>{
      this.person = new Person()
      
      this.tenant= new Tenant()

      this.tenanthasperson=new TenantsHasPersons()

      let uidPerson=thp.ccC_UIDPerson
      this.person = await lastValueFrom(this.personService.getPersonByuid(uidPerson))
      let PersonCentralAcc=this.person.centralAccount 

      let uidTenant=thp.ccC_UIDTenant
      this.tenant = await lastValueFrom(this.tenantService.getTenantbyUID(uidTenant))
      let Tenant_ccC_Name=this.tenant.ccC_Name

      let uidTenantHasPerson=thp.uiD_CCCTenantsHasPersons;
      this.tenanthasperson=await lastValueFrom(this.getTHPbyUID(uidTenantHasPerson))
      let uiD_CCCTenantsHasPersons=this.tenanthasperson.uiD_CCCTenantsHasPersons

      let thpdto = {PersonCentralAcc:PersonCentralAcc,Tenant_ccC_Name:Tenant_ccC_Name,uid_person:uidPerson,uid_tenant:uidTenant,uiD_CCCTenantsHasPersons:uidTenantHasPerson}
      this.TenantHasPersonDtoList.push(thpdto)
    })
    

}

deleteTHP(id:any){
  return this.http.delete(this.delTHP+'/'+id)
}
//   
  //return this.http.delete(this.delTHP+id).subscribe();
// const res= this.http.delete(this.delTHP+id)
//     .toPromise()
//     .then(res => {this.THP = res as TenantsHasPersons[]});
//   }

}


