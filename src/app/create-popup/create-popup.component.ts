import { Component, OnInit } from '@angular/core';
import { Dictionary, forEach } from 'lodash';
import { AaduserService } from '../Shared/Services/AADUserService/aaduser.service';
import { TenantService } from '../Shared/Services/TenantService/tenant.service';

@Component({
  selector: 'app-create-popup',
  templateUrl: './create-popup.component.html',
  styleUrls: ['./create-popup.component.css']
})
export class CreatePopupComponent implements OnInit {

  constructor(public service:TenantService, public ADuserService:AaduserService) { }

  public t:any;
  e:string

  onTenantCreate(){
    this.service.createTenant(this.e).subscribe()
    window.location.reload();
  }

  getAADUser():any{
    this.ADuserService.getAADUsers().subscribe((res: any)=>
    {
      this.t=res
    });
  }

  mySelectAADUser = [];
   selectedValueAADUser:any;
   selectChangeAADUser(){
  this.selectedValueAADUser = this.ADuserService.getDropDownTextAADUser(this.mySelectAADUser,this.t);
  
   }
  //  CreateTenantListAADUser(name:any,list:any){
  //   name=this.e
  //   list=this.selectedValueAADUser
  //   // console.log(name)
  //   // console.log(list)
  //   this.ADuserService.CreateListAADUser(name,list).subscribe()
  //   window.location.reload();
  //  }

   CreateTenantDictAADUser(name:any,list:any){
    name=this.e
    list=this.selectedValueAADUser
    let map = new Map<string,string>();
    let dictionary:any;
    for (let item of list) {
      let test = new Object();
      test={ uid:item.uiD_Person , access:'Admin'};
      let data: any
      data.set(test);
      map.set( item.uiD_Person , 'Admin'); 
      dictionary = Object.assign({}, ...data.map((x:any) => ({[x.uid]: x.access})));
      console.log(dictionary.uid);
      console.log(map.values())
  }
  
    this.ADuserService.CreateListAADUser(name,dictionary).subscribe()
    // window.location.reload();
   }

  ngOnInit(): void {
    this.getAADUser();
    
  }

}
