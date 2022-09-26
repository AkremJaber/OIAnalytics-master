import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardService } from '../Shared/Services/DashboardService/dashboard.service';
import { TenantDetailsService } from '../Shared/Services/TenantDetails/tenant-details.service';
import { TenantService } from '../Shared/Services/TenantService/tenant.service';

@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.css']
})
export class DashboardsComponent implements OnInit {


  constructor(public service:TenantService,public dashService:DashboardService,private _formBuilder: FormBuilder) { }
  public t:any;
  
  public listWSID:any[]=[];
  public dashboards:any;
  public dashboardList:any
  e:string
  alert:boolean=false



  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;

  
   mySelectTenant = [];
   selectedValueTenant:any;
   selectChangeTenant(){
    this.selectedValueTenant = this.service.getDropDownTextTenant(this.mySelectTenant,this.t);
    //console.log(this.selectedValueTenant)
   }

  get(){
    this.service.getTenants().subscribe((res:any)=>
      {
        this.t=res
        // for (let item of this.t)
        // {
        //   this.listWSID.push({WSID:item.ccC_WorkspaceId})
        // }
      });
   }

   createDash(name:any,ccC_WorkspaceId:string){
    name=this.e
    ccC_WorkspaceId=this.selectedValueTenant[0].ccC_WorkspaceId
    console.log(name)
    console.log(ccC_WorkspaceId)
    this.dashService.CreateDashboard(name,ccC_WorkspaceId).subscribe()
    window.location.reload();
    //this.alert=true
    
   }

  ngOnInit(): void {
    this.get()
    this.selectChangeTenant()
    console.log(this.e)
    
    

    
    
  }

}
