import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  readonly Dash= 'https://localhost:44361/api/EmbeddedDashboard';
  readonly Dashs= 'https://localhost:44361/api/EmbeddedDashboard/WorkspaceDashboards';

  
 getDashInfo(workspaceId:string,dashID:string){
    
    const postData = {
      CCC_WorkspaceId: workspaceId,
      DashboardId: dashID
}
     return  this.http.get(this.Dash,{params:postData})
  }

  getWorkspaceDashs(workspaceId:string){
    const postData = {
      CCC_WorkspaceId: workspaceId
}
     return  this.http.get(this.Dashs,{params:postData})
  }


  CreateDashboard(DashName:string,CCC_WorkspaceId:string){
    const postData = {
      ccC_WorkspaceId: CCC_WorkspaceId,
      name: DashName
}
return this.http.post(this.Dash,postData,{responseType:'text'})
  }

  DelDash(workspaceId:string,dashID:string){
    const postData = {
      ccC_WorkspaceId: workspaceId,
      DashboardId: dashID
}
    return this.http.delete(this.Dash,{params:postData,responseType:'text'})
  }

}
