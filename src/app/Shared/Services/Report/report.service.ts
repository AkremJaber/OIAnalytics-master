import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  
  constructor(private http: HttpClient) { }

  readonly Report= 'https://localhost:44361/api/EmbeddedReport/GetReport';
  readonly editReport= 'https://localhost:44361/api/EmbeddedReport/EditReport';
  

  getReportInfo(workspaceId:string,reportID:string){
    return this.http.get(this.Report+'/'+workspaceId+'/'+reportID)
  }

  getEditReport(workspaceId:string,reportID:string){
     return  this.http.get(this.editReport+'/'+workspaceId+'/'+reportID
      )
  }

}
