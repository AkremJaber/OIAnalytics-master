import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Report } from '../../Models/Report/report.model';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  
  constructor(private http: HttpClient) { }

  readonly Report= 'https://localhost:44361/api/EmbeddedReport';
  

  getReportInfo(workspaceId:string, reportID:string){

    return this.http.get(this.Report+'/'+workspaceId+'/'+reportID)

  }

  


}
