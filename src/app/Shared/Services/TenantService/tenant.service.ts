import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Tenant } from '../../Models/Tenant/tenant.model';

@Injectable({
  providedIn: 'root'
})
export class TenantService {

  constructor(private http: HttpClient) { }

  readonly getTenant= 'https://localhost:44361/api/Tenants';
  readonly group="https://localhost:44361/api/Tenants/Admin";

  formData:Tenant = new Tenant();
  t: Tenant;
  tenantList: Tenant[];

  getTenantbyUID(id:string):any{
    return this.http.get<Tenant>(this.getTenant+'/'+id)
  }

  getTenants():any{
    return this.http.get(this.getTenant)
  }

  deleteTenant(id:any){
    return this.http.delete(this.getTenant+'/'+id)
  }

  createTenant(ccc_Name:string){
    const postData = {
      ccC_Name :ccc_Name
    }
    return this.http.post(this.getTenant,postData)
    
  }
  
  getDropDownTextTenant(ccC_WorkspaceId:any, object:any):any{
    const selObjT = _.filter(object, function (o) {
        return ( _.includes(ccC_WorkspaceId,o.ccC_WorkspaceId));
        
    });
    return selObjT; 
  }
  getDropDownTextTUser(name:any, object:any):any{
    const selObjU = _.filter(object, function (o) {
        return ( _.includes(name,o.name));
        
    });
    return selObjU;
  }
  saveAdmin(WorkspaceId:any,email:any){
    const postAdmin = {
      CCC_WorkspaceId :WorkspaceId,
      Email: email
    }
    return this.http.post(this.group,postAdmin)


  }

}
