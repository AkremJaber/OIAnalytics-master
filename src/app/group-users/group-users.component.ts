import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GroupUsersService } from '../Shared/Services/groupUsers/group-users.service';

@Component({
  selector: 'app-group-users',
  templateUrl: './group-users.component.html',
  styleUrls: ['./group-users.component.css']
})
export class GroupUsersComponent implements OnInit {

  constructor(public service:GroupUsersService,@Inject(MAT_DIALOG_DATA) public data: any) { }
  public GrpUsr:any;
  ws:any=this.data.WSID

  get(){
    this.service.getGroupUsers(this.ws).subscribe((res:any)=>
      {
        this.GrpUsr=res.value
        console.log(this.GrpUsr);
        // for (let item of this.t)
        // {
        //   this.listWSID.push({WSID:item.ccC_WorkspaceId})
        // }
      });
   }

  ngOnInit(): void {
    this.get()
    
  }

}
