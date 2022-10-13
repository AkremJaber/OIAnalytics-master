import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isNull } from 'lodash';
import { DashboardService } from '../Shared/Services/DashboardService/dashboard.service';
import { TenantDetailsService } from '../Shared/Services/TenantDetails/tenant-details.service';
import { TenantService } from '../Shared/Services/TenantService/tenant.service';


@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.css'],
  providers:[
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ],
})
export class DashboardsComponent implements OnInit {

  
  constructor(public service:TenantService,public dashService:DashboardService,private _formBuilder: FormBuilder) { }
  public t:any;
  
  public listWSID:any[]=[];
  public dashboards:any;
  public dashboardList:any
  e:string
  alert:boolean=false
  error:boolean=false

  
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
    if( this.e== null || this.selectedValueTenant[0].ccC_WorkspaceId==null)
      {
      this.error=true
      //console.log(this.error)
      }
    name=this.e;
    ccC_WorkspaceId=this.selectedValueTenant[0].ccC_WorkspaceId;

  this.dashService.CreateDashboard(name,ccC_WorkspaceId).subscribe((res:any)=>{
      if (res instanceof TypeError) {
        this.error=true
      }
      else
      this.alert=true
    });
    //window.location.reload();
    //this.alert=true
    
   }

  ngOnInit(): void {
    this.get()
    this.selectChangeTenant()
    
    
    

    
    
  }

}
