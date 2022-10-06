import { Component, OnInit,ChangeDetectorRef, Input } from '@angular/core';
import { TenantDetailsService } from '../Shared/Services/TenantDetails/tenant-details.service';
import { TenantService } from '../Shared/Services/TenantService/tenant.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
import { CreatePopupComponent } from '../create-popup/create-popup.component';
import { DatasetService } from '../Shared/Services/datasetservice/dataset.service';
import { ReportEmbedComponent } from '../report-embed/report-embed.component';
import { ReportService } from '../Shared/Services/Report/report.service';
import { Report } from '../Shared/Models/Report/report.model';
import { DashboardService } from '../Shared/Services/DashboardService/dashboard.service';
import { DashboardEmbedComponent } from '../dashboard-embed/dashboard-embed.component';
import { timer, take } from 'rxjs';
import { GroupUsersComponent } from '../group-users/group-users.component';



  


@Component({
  selector: 'app-tenant-details',
  templateUrl: './tenant-details.component.html',
  styleUrls: ['./tenant-details.component.css']
})
export class TenantDetailsComponent implements OnInit {

 

  constructor(public dashService:DashboardService,public RepService:ReportService,public service:TenantService,public dsService:DatasetService, public detailService:TenantDetailsService,private dialog:MatDialog) {  }
  public t:any;
  public TD:any
  public reports:any
  public dashboards:any
  public datasets:any
  public EmbedUrl:any
  public Token:any
  public dashEmbedUrl:any
  public dashToken:any
  alert:boolean=false
  error:boolean=false
  Reportalert:boolean=false
  Reporterror:boolean=false


  get(){
    this.service.getTenants().subscribe((res: any)=>
      {
        this.t=res
        // console.log(this.t)
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
    });
   }

   async ViewDashboard(ccC_WorkspaceId:string ,dashId:string){
    this.dashService.getDashInfo(ccC_WorkspaceId,dashId).subscribe((res:any)=>
    {
      this.dashEmbedUrl=  res.embedUrl
      this.dashToken=res.token
    });  
    await timer(3000).pipe(take(1)).toPromise();
    this.dialog.open(DashboardEmbedComponent, {width:'1200px' , data:{DashEmbed:this.dashEmbedUrl,DashToken:this.dashToken,Id:dashId}})
   }

   DeleteDash(ccC_WorkspaceId:string ,dashId:string){
    if(confirm('Are you sure you want to delete this dashboard ?'))
    {
    this.dashService.DelDash(ccC_WorkspaceId,dashId).subscribe((res:any)=>
    {
      if (res=null) {
        this.error=true
      }
      else
      this.alert=true

    })
    //window.location.reload();

   }
  }
   
  async ViewReport(ccC_WorkspaceId:string ,reportId:string){
   this.RepService.getReportInfo(ccC_WorkspaceId,reportId).subscribe((res:any)=>
   {
    this.EmbedUrl = res.embedUrl
    this.Token = res.token

   });
   await timer(2000).pipe(take(1)).toPromise();
   this.dialog.open(ReportEmbedComponent, {width:'1200px', data:{RepEmbed:this.EmbedUrl,RepToken:this.Token}})
   }

   async EditReport(ccC_WorkspaceId:string ,reportId:string){
    this.RepService.getEditReport(ccC_WorkspaceId,reportId).subscribe((res:any)=>
    {
     this.EmbedUrl = res.embedUrl
     this.Token = res.token
    });

   await timer(1000).pipe(take(1)).toPromise();

    this.dialog.open(ReportEmbedComponent, {width:'1200px', data:{RepEmbed:this.EmbedUrl,RepToken:this.Token}})

   }
   delReport(ccC_WorkspaceId:any ,reportId:any){
    console.log(ccC_WorkspaceId,reportId)
    if(confirm('Are you sure you want to delete this report ?'))
    {
    this.detailService.deleteReport(ccC_WorkspaceId,reportId).subscribe((res:any)=>
    {
      if (res=null) {
        this.Reporterror=true
      }
      else
      this.Reportalert=true
    })
    //window.location.reload();
    }
  }

  deleteTenant(id:any){
    if(confirm('Are you sure you want to delete this tenant ?'))
    {
    this.service.deleteTenant(id).subscribe()
    window.location.reload();
    }
  }

  OpenGroupUsers(ccC_WorkspaceId:string){
    this.dialog.open(GroupUsersComponent, {width:'2000px', data:{WSID:ccC_WorkspaceId}})
  }
  
  openCloneDialog(ccC_WorkspaceId:string,reportId:string){
  this.dialog.open(PopupComponent, {width:'400px' , data:{WSID:ccC_WorkspaceId,repID:reportId}})
  }
  
  openCreateDialog(){
    this.dialog.open(CreatePopupComponent, {width:'500px',height:'500px'})
   }

   deleteDataset(ccC_WorkspaceId:string,datasetID:string){
    if(confirm('Are you sure you want to delete this dataset ?'))
    {
      this.dsService.deleteDataset(ccC_WorkspaceId,datasetID).subscribe()
      window.location.reload();
    }
   }

  
   
  ngOnInit(): void {
    this.service.getTenants().subscribe();
    this.get();
    
  }
  

}
