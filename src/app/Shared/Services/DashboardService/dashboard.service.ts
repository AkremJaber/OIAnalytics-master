import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }
  readonly Dash= 'https://localhost:44361/api/EmbeddedDashboard';
  
  getDashInfo(workspaceId:string, dashID:string){

    return this.http.get(this.Dash+'/'+workspaceId+'/'+dashID)

  }

}
