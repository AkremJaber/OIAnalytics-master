import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TenantService } from '../Shared/Services/TenantService/tenant.service';

@Component({
  selector: 'app-update-group-user',
  templateUrl: './update-group-user.component.html',
  styleUrls: ['./update-group-user.component.css']
})
export class UpdateGroupUserComponent implements OnInit {
  
  AccessRights = [
    { name: "Member" },
    { name: "Admin" },
    { name: "Viewer" },
    { name: "Contributor" }
  ];

  PrincipalType=[
    {name:"App"},
    {name:"Group"},
    {name:"None"},
    {name:"User"}
  ];

  mail:any=this.data.email;
  ws:any=this.data.WSID;
  Access:any=this.data.AccessRight;
  Principal:any=this.data.Type;
  isLinear = false;
  alert:boolean=false
  error:boolean=false

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,public service:TenantService) { }
  
  mySelectAccessRight = [];
   selectedAccessRight:any;
   selectChangeAccessRight(){
  this.selectedAccessRight = this.service.getDropDownTextAccRight(this.mySelectAccessRight,this.AccessRights);
  //console.log(this.selectedAccessRight[0].name)

   }

   mySelectPrincipalType=[];
   selectedPrincipalType:any;
   selectChangePrincipalType(){
    this.selectedPrincipalType = this.service.getDropDownTextPrincipalType(this.mySelectPrincipalType,this.PrincipalType);
    //console.log(this.selectedPrincipalType[0].name)
   }

   UpdateSelectedGroupUser(workspaceId:any,email:any,AccessRights:any,PrincipalType:any):any{
    workspaceId=this.ws
    email=this.mail
    AccessRights=this.selectedAccessRight[0].name
    PrincipalType=this.selectedPrincipalType[0].name
    // console.log(workspaceId)
    // console.log(email)
    // console.log(AccessRights)
    // console.log(PrincipalType)
    this.service.UpdateGroupUser(workspaceId,email,AccessRights,PrincipalType).subscribe((res:any)=>
    {
      if (res=null) {
        this.error=true
      }
      else
      this.alert=true
    });
   }

  ngOnInit(): void {
    //console.log(this.ws)
    //console.log(this.Access)
    //console.log(this.mail)
    //console.log(this.Principal)
  }

}
