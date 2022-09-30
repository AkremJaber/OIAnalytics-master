import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
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
]
})
export class TenantsComponent implements OnInit {

   AccessRights = [
    { name: "Member" },
    { name: "Admin" },
    { name: "Viewer" },
    { name: "Contributor" }
  ];

  constructor(public service:TenantService,public detailService:TenantDetailsService,public ADuserService:AaduserService) { }
  public t:any;
  public u:any;

  public postTenant:any
  public TD:any
  public reports:any
  public dashboards:any
  public datasets:any
  isLinear = false;




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

  get():any{
    this.service.getTenants().subscribe((res: any)=>
      {
       //this.perso = res
        this.t=res
      }
      );
   }

  deleteTenant(id:any){
    if(confirm('Are you sure you want to delete this tenant ?'))
    {
    this.service.deleteTenant(id).subscribe()
    window.location.reload();
    }
  }

  mySelectTenant = [];
   selectedValueTenant:any;
   selectChangeTenant(){
       this.selectedValueTenant = this.service.getDropDownTextTenant(this.mySelectTenant,this.t);
       console.log(this.mySelectTenant)
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
  console.log(this.selectedValueAADUser)
  
   }
  //  userSelect=[];
  //  selectedValueUser:any
  //  selectChangeUser(){
  //   this.selectedValueUser=this.service.getDropDownTextTAccRight(this.userSelect,this.AccessRights);
  //  }

   mySelectAccessRight = [];
   selectedAccessRight:any;
   selectChangeAccessRight(){
  this.selectedAccessRight = this.service.getDropDownTextAccRight(this.mySelectAccessRight,this.AccessRights);
  console.log(this.selectedAccessRight[0].name)
  
   }

 

   AddAdmin(x:any,list:any,AccRight:any){
    x=this.selectedValueTenant[0].ccC_WorkspaceId
    // y=this.userSelect
    console.log(x)
    list=this.selectedValueAADUser
    AccRight=this.selectedAccessRight[0].name
    console.log(list)
    var dict = []; // create an empty array
    for (let item of list) {
      dict.push({
        UID_Person:item.uiD_Person,
        accessRight: AccRight
}) 
  }
  console.log(dict)
  this.ADuserService.UpdateListAADUser(x,dict,AccRight).subscribe((res)=>{
    console.warn(res)
  })
  window.location.reload();
    // this.service.saveAdmin(x,y).subscribe((res)=>{
    //   console.warn(res)
    // }) 
   }
  

  ngOnInit(): void {
    this.service.getTenants().subscribe();
    this.get();
    this.getAADUser();
    
    
  }

}
