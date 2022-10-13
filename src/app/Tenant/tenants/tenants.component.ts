import { animate, state, style, transition, trigger } from '@angular/animations';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TenantDetails } from 'src/app/Shared/Models/TenantDetails/tenant-details.model';
import { AaduserService } from 'src/app/Shared/Services/AADUserService/aaduser.service';
import { TenantDetailsService } from 'src/app/Shared/Services/TenantDetails/tenant-details.service';
import { TenantService } from 'src/app/Shared/Services/TenantService/tenant.service';



@Component({
  selector: 'app-tenants',
  templateUrl: './tenants.component.html',
  styleUrls: ['./tenants.component.css'],
  animations: [
    trigger('rowExpansionTrigger', [
        state('void', style({
            transform: 'translateX(-10%)',
            opacity: 0
        })),
        state('active', style({
            transform: 'translateX(0)',
            opacity: 1
        })),
        transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
],
providers: [
  {
    provide: STEPPER_GLOBAL_OPTIONS,
    useValue: {showError: true},
  },
]

})
export class TenantsComponent implements OnInit {

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });

   AccessRights = [
    { name: "Member" },
    { name: "Admin" },
    { name: "Viewer" },
    { name: "Contributor" }
  ];

  constructor(private _formBuilder: FormBuilder,public service:TenantService,public detailService:TenantDetailsService,public ADuserService:AaduserService) { }
  public t:any;
  public u:any;

  public postTenant:any
  public TD:any
  public reports:any
  public dashboards:any
  public datasets:any
  isLinear = false;
  alert:boolean=false
  error:boolean=false




  tenantDetails(ccC_WorkspaceId:string){
    this.detailService.getTenantDetail(ccC_WorkspaceId).subscribe((res:any)=>
    {
      this.reports=res.reports
      this.dashboards=res.dashboard
      this.datasets=res.datasets
      this.TD=res
    });
   }

  get():any{
    this.service.getTenants().subscribe((res: any)=>
      {
        this.t=res
      }
      );
   }

  deleteTenant(id:any){
    if(confirm('Are you sure you want to delete this tenant ?'))
    {
    this.service.deleteTenant(id).subscribe((res:any)=>
    {
      if (res=null) {
        this.error=true
      }
      else
      this.alert=true
    })
    }
  }

  mySelectTenant = [];
   selectedValueTenant:any;
   selectChangeTenant(){
       this.selectedValueTenant = this.service.getDropDownTextTenant(this.mySelectTenant,this.t);
       //console.log(this.mySelectTenant)
   }

   getAADUser():any{
    this.ADuserService.getAADUsers().subscribe((res: any)=>
    {
      this.u=res
    });
  }

   mySelectAADUser = [];
   selectedValueAADUser:any;
   selectChangeAADUser(){
  this.selectedValueAADUser = this.ADuserService.getDropDownTextAADUser(this.mySelectAADUser,this.u);
   }

   mySelectAccessRight = [];
   selectedAccessRight:any;
   selectChangeAccessRight(){
  this.selectedAccessRight = this.service.getDropDownTextAccRight(this.mySelectAccessRight,this.AccessRights);
   }

   AddAdmin(x:any,list:any,AccRight:any){
    x=this.selectedValueTenant[0].ccC_WorkspaceId
    list=this.selectedValueAADUser
    AccRight=this.selectedAccessRight[0].name

    var dict = []; // create an empty array
    for (let item of list) {
      dict.push({
        UID_Person:item.uiD_Person,
        accessRight: AccRight
        }) 
        }

      this.ADuserService.UpdateListAADUser(x,dict,AccRight).subscribe((res:any)=>{console.log(res.TypeError)},
      (err:HttpErrorResponse)=>
      {
      if (err instanceof HttpErrorResponse ) 
      {console.log("ffffffffff1")
      this.error=true}
      else
      {
        this.alert=true}}
      );
    //window.location.reload();
    // this.service.saveAdmin(x,y).subscribe((res)=>{
    //   console.warn(res)
    // }) 
    
    console.log(this.alert)
    console.log(this.error)

   }

  ngOnInit(): void {
    this.service.getTenants().subscribe();
    this.get();
    this.getAADUser();
    
    
  }

}
