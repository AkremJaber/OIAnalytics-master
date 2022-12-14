import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Tenant } from '../../Models/Tenant/tenant.model';

@Injectable({
  providedIn: 'root'
})
export class TenantService {

  constructor(private http: HttpClient) { }
  
  
  readonly getTenant= 'https://localhost:44361/api/Tenants';
  readonly delgrpusr= 'https://localhost:44361/api/Tenants/DeleteGroupUsers';

  readonly group="https://localhost:44361/api/Tenants/Admin";
  readonly updateGroup="https://localhost:44361/api/Tenants/UpdateTenantUserGroup";


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
    return this.http.delete(this.getTenant+'/'+id,{responseType:'text'})
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
  getDropDownTextAccRight(name:any, object:any):any{
    const selObjU = _.filter(object, function (o) {
        return ( _.includes(name,o.name));
        
    });
    return selObjU;
  }

  getDropDownTextPrincipalType(name:any, object:any):any{
    const selObjP= _.filter(object,function(o){
      return(_.includes(name,o.name));
    });
    return selObjP;
  }
  
  saveAdmin(WorkspaceId:any,email:any){
    const postAdmin = {
            email: email,
            ccC_WorkspaceId: WorkspaceId
    }
    return this.http.put(this.updateGroup,postAdmin)
  }

  deleteGrpUsr(WorkspaceId:any,email:any):any{
    
    let hash:any= /#/gi
    let mail:any= email.replace(hash,"|")

    return this.http.delete(this.getTenant+'/'+WorkspaceId+'/'+mail,{responseType:'text'})
    
  }

  UpdateGroupUser(WorkspaceId:string,email:string,AccessRight:string,PrincipalType:string):any{
//     const postAdmin = {
//       CCC_WorkspaceId: WorkspaceId,
//       principleType: PrincipalType,
//       groupUserAccessRight:AccessRight ,
//       identifier:email
// }
    let hash:any= /#/gi
    let mail:any= email.replace(hash,"|")
    var options = {
      headers: new HttpHeaders({
         'Accept':'text/plain'
      }),
      'responseType': 'text' as 'json'
   }

    return this.http.put(this.getTenant+'/'+WorkspaceId+'/'+PrincipalType+'/'+AccessRight+'/'+mail,{responseType:'text'},options)
  }
}
