import { Component, Inject, Input, OnInit } from '@angular/core';
import { TenantDetailsComponent } from '../tenant-details/tenant-details.component';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { TenantDetailsService } from '../Shared/Services/TenantDetails/tenant-details.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public service:TenantDetailsService) { }
  e:string
  ws:any=this.data.WSID
  rep:any=this.data.repID
  
  
  CloneReport(){
    this.service.cloneReport(this.e,this.ws,this.rep).subscribe()
    window.location.reload();
  }
  

  ngOnInit(): void {
    
  }

}
