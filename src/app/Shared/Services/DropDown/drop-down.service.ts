import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Person } from '../../Models/Person/person.model';
import { Tenant } from '../../Models/Tenant/tenant.model';
import * as _ from 'lodash';
import { map, Observable } from 'rxjs';
import { TenantsHasPersons } from '../../Models/TenantsHasPersons/tenants-has-persons.model';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DropDownService {

  constructor(private http:HttpClient) { }
  readonly baseURL = 'https://localhost:44361/api/Person';
  readonly tenants = 'https://localhost:44361/api/Tenants';
  readonly THP='https://localhost:44361/api/TenantsHasPersons/';
  list: Person[];
  listTenants:Tenant[];

  getPersons():any{
    return this.http.get(this.baseURL)
  }
  
  getTenants():any{
    
      return this.http.get(this.tenants)
    }
  //   const res =this.http.get(this.baseURL)
  //   .toPromise()
  //   .then(res => {this.list = res as Person[]});
  // }
  // getPersons():any{
  //   return this.http.get<[]>(this.baseURL)
  //   .pipe(map(data => {
  //    this.list=data;
  //    return; 
  //   }));
  // }

  // getTenants():any{
  //   //return this.http.get(this.baseURL)
    
  //   const res =this.http.get(this.tenants)
  //   .toPromise()
  //   .then(res => {this.listTenants = res as Tenant[]});
  // }
  
    // .pipe(map(data=>{
    //   this.listTenants=data;
    //   return;
    // }));
  

  getDropDownText(uiD_Person:any, object:any):any{
    const selObj = _.filter(object, function (o) {
        return ( _.includes(uiD_Person,o.uiD_Person));
        
    });
    return selObj;
    
  }
  getDropDownTextTenant(uiD_CCCTenants:any, object:any):any{
    const selObjT = _.filter(object, function (o) {
        return ( _.includes(uiD_CCCTenants,o.uiD_CCCTenants));
        
    });
    return selObjT;
    
  }
  
  // saveTHP(a:any,b:any){
  //   console.log(a)
  //   console.log(b)
  //   return this.http.post(this.THP+a+'/'+b,null)
  // }
  saveTHp(a:any,b:any){
    const postData = {
      uid_person :a,
      uid_tenant: b
    }
    return this.http.post(this.THP,postData)
  }
}
