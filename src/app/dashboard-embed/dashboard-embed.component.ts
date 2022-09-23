import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDashboardEmbedConfiguration, models } from 'powerbi-client';
import { PowerBIDashboardEmbedComponent, PowerBIReportEmbedComponent } from 'powerbi-client-angular';

@Component({
  selector: 'app-dashboard-embed',
  templateUrl: './dashboard-embed.component.html',
  styleUrls: ['./dashboard-embed.component.css']
})
export class DashboardEmbedComponent implements OnInit {
  
  dashClass = 'dashboard-container hidden';
  
  token:any=this.data.DashToken
  url:any=this.data.DashEmbed
  id:any=this.data.Id
  
  
  
  dashConfig: IDashboardEmbedConfiguration = {
    type: 'dashboard',
    id:this.id,
    embedUrl: this.url,
    accessToken: this.token,
    tokenType: models.TokenType.Embed
  };

  constructor(@Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
    console.log(this.token)
  }
}
