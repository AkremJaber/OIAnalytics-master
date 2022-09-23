import { createInjectableType } from '@angular/compiler';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IReportEmbedConfiguration, models, service } from 'powerbi-client';
import { PowerBIReportEmbedComponent } from 'powerbi-client-angular';
import { reportUrl, errorElement, errorClass, hidden, position, successElement, successClass } from 'src/constants';
import { ConfigResponse } from '../app.component';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-report-embed',
  templateUrl: './report-embed.component.html',
  styleUrls: ['./report-embed.component.css']
})
export class ReportEmbedComponent implements OnInit {

  @ViewChild(PowerBIReportEmbedComponent) reportObj!: PowerBIReportEmbedComponent;

  // Div object to show status of the demo app
  @ViewChild('status') private statusRef!: ElementRef<HTMLDivElement>;

  // Embed Report button element of the demo app
  @ViewChild('embedReportBtn') private embedBtnRef!: ElementRef<HTMLButtonElement>;

  // Track Report embedding status
  isEmbedded = false;

  // Overall status message of embedding
  displayMessage = 'The report is bootstrapped. Click Embed Report button to set the access token.';

  // CSS Class to be passed to the wrapper
  // Hide the report container initially
  reportClass = 'report-container hidden';

  // Flag which specify the type of embedding
  phasedEmbeddingFlag = false;

  // token:any=this.data.RepToken
  // url:any=this.data.RepEmbed
  // Pass the basic embed configurations to the wrapper to bootstrap the report on first load
  // Values for properties like embedUrl, accessToken and settings will be set on click of button
  reportConfig: IReportEmbedConfiguration = {
    type: 'report',
    embedUrl: this.data.RepEmbed,
    tokenType: models.TokenType.Embed,
    accessToken: this.data.RepToken,
    settings: undefined,
  };

  /**
   * Map of event handlers to be applied to the embedded report
   */
  // Update event handlers for the report by redefining the map using this.eventHandlersMap
  // Set event handler to null if event needs to be removed
  // More events can be provided from here
  // https://docs.microsoft.com/en-us/javascript/api/overview/powerbi/handle-events#report-events
  // eventHandlersMap = new Map<string, (event?: service.ICustomEvent<any>) => void>([
  //   ['loaded', () => console.log('Report has loaded')],
  //   [
  //     'rendered',
  //     () => {
  //       console.log('Report has rendered');

  //       // Set displayMessage to empty when rendered for the first time
  //       if (!this.isEmbedded) {
  //         this.displayMessage = 'Use the buttons above to interact with the report using Power BI Client APIs.';
  //       }

  //       // Update embed status
  //       this.isEmbedded = true;
  //     },
  //   ],
  //   [
  //     'error',
  //     (event?: service.ICustomEvent<any>) => {
  //       if (event) {
  //         console.error(event.detail);
  //       }
  //     },
  //   ],
  //   ['visualClicked', () => console.log('visual clicked')],
  //   ['pageChanged', (event) => console.log(event)],
  // ]);

  constructor(public httpService: HttpService, private element: ElementRef<HTMLDivElement>,@Inject(MAT_DIALOG_DATA) public data:any) { }

  // async embedReport(): Promise<void> {
    
  //   let reportConfigResponse: ConfigResponse;

  //   // Get the embed config from the service and set the reportConfigResponse
  //   try {
  //     reportConfigResponse = this.httpService.getEmbedConfig(reportUrl);
  //   } 
  //   catch (error: any) {
  //     // Prepare status message for Embed failure
  //     await this.prepareDisplayMessageForEmbed(errorElement, errorClass);
  //     this.displayMessage = `Failed to fetch config for report. Status: ${error.statusText} Status Code: ${error.status}`;
  //     console.error(this.displayMessage);
  //     return;
  //   }

  //   // Update the reportConfig to embed the PowerBI report
  //   this.reportConfig = {
  //     ...this.reportConfig,
  //     id: reportConfigResponse.Id,
  //     embedUrl: reportConfigResponse.EmbedUrl,
  //     accessToken: reportConfigResponse.EmbedToken.Token,
  //   };

  //   // Get the reference of the report-container div
  //   const reportDiv = this.element.nativeElement.querySelector('.report-container');
  //   if (reportDiv) {
  //     // When Embed report is clicked, show the report container div
  //     reportDiv.classList.remove(hidden);
  //   }

  //   // Get the reference of the display-message div
  //   const displayMessage = this.element.nativeElement.querySelector('.display-message');
  //   if (displayMessage) {
  //     // When Embed report is clicked, change the position of the display-message
  //     displayMessage.classList.remove(position);
  //   }

  //   // Prepare status message for Embed success
  //   await this.prepareDisplayMessageForEmbed(successElement, successClass);

  //   // Update the display message
  //   this.displayMessage = 'Access token is successfully set. Loading Power BI report.';
  // }
  // async prepareDisplayMessageForEmbed(img: HTMLImageElement, type: string): Promise<void> {
  //   // Remove the Embed Report button from UI
  //   this.embedBtnRef.nativeElement.remove();

  //   // Prepend the Image element to the display message
  //   this.statusRef.nativeElement.prepend(img);

  //   // Set type of the message
  //   this.statusRef.nativeElement.classList.add(type);
  // }



  ngOnInit(): void {
    // console.log(this.token)
    // console.log(this.url)
   
  }

}
