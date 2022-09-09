import { Component, OnInit,ChangeDetectorRef, AfterContentChecked } from '@angular/core';
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
export class TenantDetailsComponent implements OnInit,AfterContentChecked {

  constructor(public service:TenantService, public detailService:TenantDetailsService,private changeDetector: ChangeDetectorRef) { }
  public t:any;
  public TD:any
  public reports:any
  public dashboards:any
  public datasets:any

  get(){
    this.service.getTenants().subscribe((res: any)=>
      {
        this.t=res
        console.log(this.t)
      }
      );
   }
   tenantDetails(ccC_WorkspaceId:string){
    this.detailService.getTenantDetail(ccC_WorkspaceId).subscribe((res:any)=>
    {
      this.reports=res.reports
      this.dashboards=res.dashboard
      this.datasets=res.datasets
      this.TD=res
      console.log(this.TD)
      console.log(this.reports)
      console.log(this.dashboards)
      console.log(this.datasets)

    }
    );
    
   }
   step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }


  ngOnInit(): void {
    this.service.getTenants().subscribe();
    this.get();
  }
  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

}
