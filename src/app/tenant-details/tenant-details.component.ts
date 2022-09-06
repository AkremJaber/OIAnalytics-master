import { Component, OnInit } from '@angular/core';
import { DataSet } from '../Shared/Models/DataSet/data-set.model';
import { Report } from '../Shared/Models/Report/report.model';
import { Dashboard } from '../Shared/Models/Dashboard/dashboard.model';
import { TenantDetails } from '../Shared/Models/TenantDetails/tenant-details.model';
import { TenantDetailsService } from '../Shared/Services/TenantDetails/tenant-details.service';
import { TenantService } from '../Shared/Services/TenantService/tenant.service';

@Component({
  selector: 'app-tenant-details',
  templateUrl: './tenant-details.component.html',
  styleUrls: ['./tenant-details.component.css']
})
export class TenantDetailsComponent implements OnInit {

  constructor(public service:TenantService, public detailService:TenantDetailsService) { }
  public t:any;
  TD:TenantDetails[]
  report:Report[]
  dashboard:Dashboard[]
  dataset:DataSet[]

  get(){
    this.service.getTenants().subscribe((res: any)=>
      {
        this.t=res
      }
      );
   }
   tenantDetails(ccC_WorkspaceId:string){
    this.detailService.getTenantDetail(ccC_WorkspaceId).subscribe((res:any)=>
    {
      this.report=res.reports
      this.dashboard=res.dashboard
      this.dataset=res.datasets
      this.TD=res
      console.log(this.dashboard)
    }
    );
    
   }

  ngOnInit(): void {
    this.service.getTenants().subscribe();
    this.get();
  }

}
