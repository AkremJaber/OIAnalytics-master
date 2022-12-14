import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Dictionary, forEach, isEmpty, isError } from 'lodash';
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
  isLinear = false;
  alert:boolean=false
  err:boolean=false

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
  //console.log(this.selectedValueAADUser)
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
    if (list==null || name==null)
    {
      this.err=true
    }
    //console.log(this.e)
    var dict = []; // create an empty array
    for (let item of list){
      dict.push({
        UID_Person:item.uiD_Person,
        accessRight: 'Admin'
      }) 
    }
  //console.log(dict)
    this.ADuserService.CreateListAADUser(name,dict).subscribe((res:any)=>{
      if (res instanceof TypeError) {
        this.err=true
      }
      else
      this.alert=true
    }
    )
    //window.location.reload();
   }



  ngOnInit(): void {
    this.getAADUser();
    
  }

}


