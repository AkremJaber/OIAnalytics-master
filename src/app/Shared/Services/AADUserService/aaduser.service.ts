import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class AaduserService {

  constructor(private http: HttpClient) { }

  readonly baseURL = 'https://localhost:44361/api/AADUser';
  readonly CreateTenantListAADUser = 'https://localhost:44361/api/Tenants/CreateTenantListAADUser';


  getAADUsers():any{
    return this.http.get(this.baseURL)
  }

  getDropDownTextAADUser(uiD_Person:any, object:any):any{
    const selObjT = _.filter(object, function (o) {
        return ( _.includes(uiD_Person,o.uiD_Person));
        
    });
    
    return selObjT; 

  }
  CreateListAADUser(name:any,adUser:any)
  {
    const postData = {
      ccC_Name: name,
      aadUser: adUser
      }
      return this.http.post(this.CreateTenantListAADUser,postData)
  }




}
