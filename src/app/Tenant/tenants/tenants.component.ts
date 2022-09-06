import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TenantService } from 'src/app/Shared/Services/TenantService/tenant.service';


@Component({
  selector: 'app-tenants',
  templateUrl: './tenants.component.html',
  styleUrls: ['./tenants.component.css']
})
export class TenantsComponent implements OnInit {
  emails = [
    { name: "akrem.jaber_securityaccent.com#EXT#@IdentiteqLab.onmicrosoft.com" },
    { name: "SEAC_Admin@identiteqlab.onmicrosoft.com" }
  ];
  constructor(public service:TenantService) { }
  public t:any;
  public postTenant:any
  
  e:string

  get(){
    this.service.getTenants().subscribe((res: any)=>
      {
       //this.perso = res
        this.t=res
        //console.log(res)
      }
      );
   }

  deleteTenant(id:any){
    console.log(id)
    if(confirm('Are you sure you want to delete this tenant ?'))
    {
    this.service.deleteTenant(id).subscribe()
    window.location.reload();
    }
  }

  onTenantCreate(){
    //console.log(this.e)
    this.service.createTenant(this.e).subscribe()
    window.location.reload();
  }

  mySelectTenant = [];
   selectedValueTenant:any;
   selectChangeTenant() {
       this.selectedValueTenant = this.service.getDropDownTextTenant(this.mySelectTenant,this.t);
       
   }

   userSelect=[];
   selectedValueUser:any
   selectChangeUser(){
    this.selectedValueUser=this.service.getDropDownTextTUser(this.userSelect,this.emails)
   }

   AddAdmin(x:any,y:any){
    x=this.selectedValueTenant[0].ccC_WorkspaceId
    y=this.selectedValueUser[0].name
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
