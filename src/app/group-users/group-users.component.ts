import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GroupUsersService } from '../Shared/Services/groupUsers/group-users.service';
import { TenantService } from '../Shared/Services/TenantService/tenant.service';
import { UpdateGroupUserComponent } from '../update-group-user/update-group-user.component';

@Component({
  selector: 'app-group-users',
  templateUrl: './group-users.component.html',
  styleUrls: ['./group-users.component.css']
})
export class GroupUsersComponent implements OnInit {

  constructor(public service:GroupUsersService,@Inject(MAT_DIALOG_DATA) public data: any,public tenantService:TenantService,private dialog:MatDialog) { }
  public GrpUsr:any;
  ws:any=this.data.WSID
  alert:boolean=false
  error:boolean=false

  get(){
    this.service.getGroupUsers(this.ws).subscribe((res:any)=>
      {
        this.GrpUsr=res.userGroup
        console.log(this.GrpUsr);
        // for (let item of this.t)
        // {
        //   this.listWSID.push({WSID:item.ccC_WorkspaceId})
        // }
      });
   }
   deleteGrpUsr(email:any):any{
    //console.log(mail)
    if(confirm('Are you sure you want to delete this user ?'))
    {
      this.tenantService.deleteGrpUsr(this.ws,email).subscribe((res:any)=>{
        if (res=null) {
          this.error=true
        }
        else
        this.alert=true
      })
    }
   }
   
   modGrpUsr(emailAddress:any,groupUserAccessRight:any,principalType:any){
    this.dialog.open(UpdateGroupUserComponent, {width:'500px',data:{WSID:this.ws,email:emailAddress,AccessRight:groupUserAccessRight,Type:principalType}})
   }
   
//window.location.reload();
  ngOnInit(): void {
    this.get()
    
  }

}
