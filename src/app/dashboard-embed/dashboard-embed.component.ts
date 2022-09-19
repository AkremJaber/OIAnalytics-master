import { Component, OnInit } from '@angular/core';
import { IDashboardEmbedConfiguration, models } from 'powerbi-client';

@Component({
  selector: 'app-dashboard-embed',
  templateUrl: './dashboard-embed.component.html',
  styleUrls: ['./dashboard-embed.component.css']
})
export class DashboardEmbedComponent implements OnInit {

  // dashConfig: IDashboardEmbedConfiguration = {
  //   type: 'dashboard',
  //   embedUrl: this.url,
  //   id: string;
  //   accessToken: string;
  //   pageView?: models.PageView 
  //   tokenType?: models.TokenType;
  // };

  constructor() { }

  ngOnInit(): void {
  }

}
