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

  token:any=this.data.RepToken
  url:any=this.data.RepEmbed
  // Pass the basic embed configurations to the wrapper to bootstrap the report on first load
  // Values for properties like embedUrl, accessToken and settings will be set on click of button
  reportConfig: IReportEmbedConfiguration = {
    type: 'report',
    embedUrl: this.url,
    tokenType: models.TokenType.Embed,
    //accessToken: "H4sIAAAAAAAEAB3Ut66EVgBF0X95LZYYhmzJBXDJOYeOnIYwZLD87352v6ulo_P3j5Xenyktfv78IRkFpcd07Ow-PEkvCPDpTWujTYnHR68_de5j-UEkkeJ8qNCdE-lstypmqwnLt-VlvTyOWqWLg9T30MhyhosHZZaWkb92lTwlk-MrOum0vOrNPk3woItSB1rckU-Lhygi7UUjfoOKtwfFomK5g9yVNU18JiSw5puEcs4_yVLin9nH4M0fe6tRA7SYQuOwlUtcRzhmd5ji4O9SCKsYhkFdcOUr0kvuVPmsYNysCJSl3Hrbf-mQj0RtvI0rYBt8uIHNbqmYRaRWv5jUAHQLI5LHw3vivNjWWEw5JUMEZ0bijLgQsDlqo_C5e3vw1J9j2rXs3uutjAP6dMl7l5LVLlbhYNV0VfFh7XTSPe7TYgV_7XuM4FIHdF5UAVhL1Za5jhhGsGdAt2HlTpO-sklSpzFlfU8_Pyuy3zDKfBiJvwuxbQl9aULDi22xdfY61w0N01OYFHSBpnMAv4N6vAClOCZM6HhiE-sHIfI6aKgQo220a-xgZlClX1w6i1gOS80vA_uY61jOd02aGYoafyTXMTctNJUF3Q7G3yxdF0o0Q4N0Pp-seMn-E0BSzluaBssBezpl-X41WDTUU1J-lNetQm__qTRApPyND_HwLtsKoYrPE4xc-eSz5NT21Uhl8XyBi6UfSj641pqL9HmSQG-M_RA3dGBEuVv53VhLA0LcDtCgs9_PIANcYZmezY4kvnjuZOlWKKJOUCu6noWTHMohhdQVXc9G5xJhhc5gQGNEmWJ3INMS5P1fP3_8cMs9b5Na3r_TX4ThC3hlL7Mh0u9iOKoqYZxOZ0TmqSwJ8mUAliYCqhUMMtkjyZnzwya7nh0YnW7D31dC0XAcb3mxVMCJlSTfJwTKsnKAfAVkm1_kqkrYi4bxYpLRgpIGKUtD-lO_CkWQtrFgmreXvGM6zHy7VviSoujyOC4mkYIHQ3QK1r-LhXWTlydQBxCEDexGhPgkKNepRVh0zYnI5V4YO26d6FIDc3leewvsVt--QsdbHQ1laUv8XLmbpywTY-iYWhab2wk6v08oeBY-fkMbepqe7GET0A1Ua-8ZLPBXgBJOT861snXeLcmw8mXvevPgqS8vx_VmudEtSFGhYqVR0RbQR9hmxfVf_zPfc1MucvCr_BgPcRJixK2WDcwOZDAuwPb_ldvWY7rtS_mb-UJfIewCnJAeT89r-Ib8usLbMI8ubK4DxDJNdNFAfxUwd5gt8FrXFBdhF8mE3xA-Vny_yIbMOiq0rw2z9hw_LhcfZptYk7mXRPd53HfTmUPict2XUGrbjHiGDKfZYokx7jl6fUoXJ7uerf2dRruYX8WxnzEcl7TUgruEwnhHm-kIRl4D7GQYj1zhBxv6TUHlWy7x9vJuE1Tz5zCCDcaiN2JSTOywQ_m0EotREZANXlOlWJcgKxqKqIBXO3pNmJCwGiMnURhE6_1U3rTXuLR7-iREmtZIS0MLEkI9EfXUX-QddQmymKGYUfeOsOxtWTU_hvFdKqz8_Pddq7HRIlV0FXP-Mv_zL3IYGNbuBQAA.eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLU5PUlRILUVVUk9QRS1RLVBSSU1BUlktcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQiLCJlbWJlZEZlYXR1cmVzIjp7Im1vZGVybkVtYmVkIjpmYWxzZX19",
    accessToken: this.token,
    settings: undefined,
  };

  /**
   * Map of event handlers to be applied to the embedded report
   */
  // Update event handlers for the report by redefining the map using this.eventHandlersMap
  // Set event handler to null if event needs to be removed
  // More events can be provided from here
  // https://docs.microsoft.com/en-us/javascript/api/overview/powerbi/handle-events#report-events
  eventHandlersMap = new Map<string, (event?: service.ICustomEvent<any>) => void>([
    ['loaded', () => console.log('Report has loaded')],
    [
      'rendered',
      () => {
        console.log('Report has rendered');

        // Set displayMessage to empty when rendered for the first time
        if (!this.isEmbedded) {
          this.displayMessage = 'Use the buttons above to interact with the report using Power BI Client APIs.';
        }

        // Update embed status
        this.isEmbedded = true;
      },
    ],
    [
      'error',
      (event?: service.ICustomEvent<any>) => {
        if (event) {
          console.error(event.detail);
        }
      },
    ],
    ['visualClicked', () => console.log('visual clicked')],
    ['pageChanged', (event) => console.log(event)],
  ]);

  constructor(public httpService: HttpService, private element: ElementRef<HTMLDivElement>,@Inject(MAT_DIALOG_DATA) public data:any) { }

  async embedReport(): Promise<void> {
    
    let reportConfigResponse: ConfigResponse;

    // Get the embed config from the service and set the reportConfigResponse
    try {
      reportConfigResponse = this.httpService.getEmbedConfig(reportUrl);
    } 
    catch (error: any) {
      // Prepare status message for Embed failure
      await this.prepareDisplayMessageForEmbed(errorElement, errorClass);
      this.displayMessage = `Failed to fetch config for report. Status: ${error.statusText} Status Code: ${error.status}`;
      console.error(this.displayMessage);
      return;
    }

    // Update the reportConfig to embed the PowerBI report
    this.reportConfig = {
      ...this.reportConfig,
      id: reportConfigResponse.Id,
      embedUrl: reportConfigResponse.EmbedUrl,
      accessToken: reportConfigResponse.EmbedToken.Token,
    };

    // Get the reference of the report-container div
    const reportDiv = this.element.nativeElement.querySelector('.report-container');
    if (reportDiv) {
      // When Embed report is clicked, show the report container div
      reportDiv.classList.remove(hidden);
    }

    // Get the reference of the display-message div
    const displayMessage = this.element.nativeElement.querySelector('.display-message');
    if (displayMessage) {
      // When Embed report is clicked, change the position of the display-message
      displayMessage.classList.remove(position);
    }

    // Prepare status message for Embed success
    await this.prepareDisplayMessageForEmbed(successElement, successClass);

    // Update the display message
    this.displayMessage = 'Access token is successfully set. Loading Power BI report.';
  }
  async prepareDisplayMessageForEmbed(img: HTMLImageElement, type: string): Promise<void> {
    // Remove the Embed Report button from UI
    this.embedBtnRef.nativeElement.remove();

    // Prepend the Image element to the display message
    this.statusRef.nativeElement.prepend(img);

    // Set type of the message
    this.statusRef.nativeElement.classList.add(type);
  }



  ngOnInit(): void {
    // console.log(this.token)
    // console.log(this.url)

  }

}
