import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TenantDetails } from 'src/app/Shared/Models/TenantDetails/tenant-details.model';
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

   emails = [
    { name: "akrem.jaber_securityaccent.com#EXT#@IdentiteqLab.onmicrosoft.com" },
    { name: "SEAC_Admin@identiteqlab.onmicrosoft.com" }
  ];

  constructor(public service:TenantService,public detailService:TenantDetailsService) { }
  public t:any;
  public postTenant:any
  public TD:any
  public reports:any
  public dashboards:any
  public datasets:any




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
   }

   userSelect=[];
   selectedValueUser:any
   selectChangeUser(){
    this.selectedValueUser=this.service.getDropDownTextTUser(this.userSelect,this.emails);
    
    
   }

   AddAdmin(x:any,y:any){
    x=this.selectedValueTenant[0].ccC_WorkspaceId
    // y=this.userSelect
    y=this.selectedValueUser[0].name
    console.log(y)
    this.service.saveAdmin(x,y).subscribe((res)=>{
      console.warn(res)
    }) 
   }
  

  ngOnInit(): void {
    this.service.getTenants().subscribe();
    this.get();
    
    //this.service.getTenantbyUID("");
  }

}
