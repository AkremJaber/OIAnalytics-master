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
  ]

  mail:any=this.data.email;
  ws:any=this.data.WSID;
  Access:any=this.data.AccessRight;
  Principal:any=this.data.Type;

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,public service:TenantService) { }
  
  mySelectAccessRight = [];
   selectedAccessRight:any;
   selectChangeAccessRight(){
  this.selectedAccessRight = this.service.getDropDownTextAccRight(this.mySelectAccessRight,this.AccessRights);
   }

   mySelectPrincipalType=[];
   selectedPrincipalType:any;
   selectChangePrincipalType(){
    this.selectedPrincipalType=this.service.getDropDownTextPrincipalType(this.mySelectPrincipalType,this.PrincipalType);
   }

   UpdateSelectedGroupUser(workspaceId:any,email:any,AccessRights:any,PrincipalType:any){
    this.service.UpdateGroupUser(workspaceId,email,AccessRights,PrincipalType).subscribe()
   }

  ngOnInit(): void {
    console.log(this.ws)
    //console.log(this.Access)
    console.log(this.mail)
    //console.log(this.Principal)




  }

}
