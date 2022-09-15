import { Component, OnInit,ChangeDetectorRef, AfterContentChecked } from '@angular/core';
import { DataSet } from '../Shared/Models/DataSet/data-set.model';
import { Report } from '../Shared/Models/Report/report.model';
import { Dashboard } from '../Shared/Models/Dashboard/dashboard.model';
import { TenantDetails } from '../Shared/Models/TenantDetails/tenant-details.model';
import { TenantDetailsService } from '../Shared/Services/TenantDetails/tenant-details.service';
import { TenantService } from '../Shared/Services/TenantService/tenant.service';
import { ConnectedPositioningStrategy, HorizontalAlignment, VerticalAlignment, NoOpScrollStrategy, ISelectionEventArgs } from 'igniteui-angular';
import { ItemModel } from '@syncfusion/ej2-angular-splitbuttons/public_api';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
import { CreatePopupComponent } from '../create-popup/create-popup.component';
import { DatasetService } from '../Shared/Services/datasetservice/dataset.service';




@Component({
  selector: 'app-tenant-details',
  templateUrl: './tenant-details.component.html',
  styleUrls: ['./tenant-details.component.css']
})
export class TenantDetailsComponent implements OnInit {

  constructor(public service:TenantService,public dsService:DatasetService, public detailService:TenantDetailsService,private changeDetector: ChangeDetectorRef,private dialog:MatDialog) { }
  public t:any;
  public TD:any
  public reports:any
  public dashboards:any
  public datasets:any

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
      // console.log(this.TD)
      // console.log(this.reports)
      // console.log(this.dashboards)
      // console.log(this.datasets)

    }
    );
    
   }
   delReport(ccC_WorkspaceId:any ,reportId:any){
    console.log(ccC_WorkspaceId,reportId)
    if(confirm('Are you sure you want to delete this report ?'))
    {
    this.detailService.deleteReport(ccC_WorkspaceId,reportId).subscribe()
    window.location.reload();
    }
  }

  deleteTenant(id:any){
    if(confirm('Are you sure you want to delete this tenant ?'))
    {
    this.service.deleteTenant(id).subscribe()
    window.location.reload();
    }
  }
  // WSID:any
  // repID:any
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
