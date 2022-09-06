import { Component, Input, NgModule,ElementRef, ViewChild } from '@angular/core';
import { ReportConfig } from 'angular-powerbi-report';
import { IHttpPostMessageResponse } from 'http-post-message';
import { IReportEmbedConfiguration, models, Page, Report, service, VisualDescriptor } from 'powerbi-client';
import { PowerBIReportEmbedComponent } from 'powerbi-client-angular';
import 'powerbi-report-authoring';
import { errorClass, errorElement, hidden, position, reportUrl, successClass, successElement } from 'src/constants';
import { HttpService } from './services/http.service';

// Handles the embed config response for embedding
export interface ConfigResponse {
  Id: string;
  EmbedUrl: string;
  EmbedToken: {
    Token: string;
  };
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'OIAnalytics';
  
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

  // Pass the basic embed configurations to the wrapper to bootstrap the report on first load
  // Values for properties like embedUrl, accessToken and settings will be set on click of button
  reportConfig: IReportEmbedConfiguration = {
    type: 'report',
    embedUrl: "https://app.powerbi.com/reportEmbed?reportId=bb7f70d0-8db8-482c-86ab-a42edd3c4e13&groupId=ddbb5f1e-e715-426f-8888-793c4359f0c2&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLU5PUlRILUVVUk9QRS1RLVBSSU1BUlktcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQiLCJlbWJlZEZlYXR1cmVzIjp7Im1vZGVybkVtYmVkIjp0cnVlLCJ1c2FnZU1ldHJpY3NWTmV4dCI6dHJ1ZX19",
    tokenType: models.TokenType.Embed,
    accessToken: "H4sIAAAAAAAEAB3St7KDVgBF0X95LZ4hJ8-4IGcQEiLcDrhkkRHJ43_3s_tdrXP-_nmk12dM4c-fP_Z1O9GTXGAgzptqELuGEgUZ7W1teqJMfISqXGlNJmPZkLGOtIGp-PLMy4-hY67ARr4Zss730teepD_M5FmW5to1zQ3ENREnZPm-h9xBSHu2i6NsLL80jlB62t1-LFpQwYbiTZyuchco2vhJIF4yS0t8hzA7KXk2LEC6NdU_V4DiA-oKaMPMVWranO30Rz01pZttg_WwRbJBDxhn6iglmr71ylgS9ziXcXERn3QBm58QQWwebv94itLOfSz_ZM94yIgAilFS3grZKLcS4Mo3wBFMGGyfGt6zaEBLn16lrU2eNugXUWN47eUfS-n2myyIi6xFnLQ3fmX1DfpHrw9xsY4NDZGgZCbMVbo1itp-WI25U-dKh3L8UWeUWEGe7GTwNLEacIarhTTC6GLQ6s6cz4uHkvvjoYD3bX28K-jT6WKf2dxjAzVRqMVsOd3Tn6gjzbXXkne7RVVmcYfHQCiwBuNrEbspQVTmM9pU2pMXpcPYDkBuQmWeG-gGilROjzB2oShKQAJ7HylDhn4Gd6gf8dMclqniKapS4Ktgy7qjYJFxtlrfbK1aRYchh0959tYfxcHyarPgJA6drApB1PpALT7HiphaoZGFOF8DsYx1Bk7-NGzrKu1MnzIzQb34jMT-u-RETWbOc3e_QBc2nwuiOeXoS4tcLreqiJebesU6pOikQBxPoTHNuw1Y0dPwAkZTN2JJeXr0YyvHeSTyK-ZW0Y8rPqL8XEmCCDKbWiA5OtK689fPHz_Sck3baBXX7_Wf34tTqe1lM3NAUqVQJW3LBcvxO2F0pvLJAt4ZoKVCTeqLOU9fJIlJjvPuHGWxxneWdVHzSqVelb_xjvLzkQsWX0J-l4LBZb5ibOyuFRniegSlrwY-FvlLa0zr4fBsP4-bUhmlrmbRTQQrd9JIfqf7VLNSNIvqQOBCiHeLvBDC_kshf92ZlKsarBrmew52mhrS44xB9xwumNpaP4CFBC-CYISkBdB3ksAF4Wc1O1IFD6OPhaOHcfTy8vtlE4RZn3yhuHTxdjgN36dQDHFDnO4ebkXurOrG2tvknaV4pHxCPHjfihsx3nY2faIr7Q05CD1cBUib1uSWVRlbsGmhhkJICX_9z3xNdbEY4a9yw89lfmzs8ehVxDTZRzS7efV_9WqqId2-S_GbCXKzAEKQ6lm10aAmKIQ3QE2OrbN8QmFV033nvmhrYafkw6nviNwOn59crLtzoRVgqJHZkHOKuS5zbH2reKCwqwV874Zdtmh-hw8vpJ85yx2RcZfKMvlI4KdU5Lwx7sWX6JoMBouwe1opfAq9sAWtNDNbLL-mcl3HRUC93oD8u8CPUrXX2VpqAY2Bg1mh6IcYzrtA8K3Ben-3cZg-Z4mW0FyloG16-K3KB88IukeLbwWM4T6wMEj0z0QU8pFO-g1rNgXrV7jQfkFyTLd6OFmHdNGH4qBrIHx4s8XF14Y55xNhS-vK3omwKLfHhKIzvKnbEGD_PJID0eFxHvXBKams8O__mP_5F1MhDMTuBQAA.eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLU5PUlRILUVVUk9QRS1RLVBSSU1BUlktcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQiLCJlbWJlZEZlYXR1cmVzIjp7Im1vZGVybkVtYmVkIjpmYWxzZX19",
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

  constructor(public httpService: HttpService, private element: ElementRef<HTMLDivElement>) {}

  /**
   * Embeds report
   *
   * @returns Promise<void>
   */
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

  /**
   * Handle Report embedding flow
   * @param img Image to show with the display message
   * @param type Type of the message
   *
   * @returns Promise<void>
   */
  async prepareDisplayMessageForEmbed(img: HTMLImageElement, type: string): Promise<void> {
    // Remove the Embed Report button from UI
    this.embedBtnRef.nativeElement.remove();

    // Prepend the Image element to the display message
    this.statusRef.nativeElement.prepend(img);

    // Set type of the message
    this.statusRef.nativeElement.classList.add(type);
  }

  /**
   * Delete visual
   *
   * @returns Promise<void>
   */
  async deleteVisual(): Promise<void> {
    // Get report from the wrapper component
    const report: Report = this.reportObj.getReport();

    if (!report) {
      // Prepare status message for Error
      this.prepareStatusMessage(errorElement, errorClass);
      this.displayMessage = 'Report not available.';
      console.log(this.displayMessage);
      return;
    }

    // Get all the pages of the report
    const pages: Page[] = await report.getPages();

    // Check if all the pages of the report deleted
    if (pages.length === 0) {
      // Prepare status message for Error
      this.prepareStatusMessage(errorElement, errorClass);
      this.displayMessage = 'No pages found.';
      console.log(this.displayMessage);
      return;
    }

    // Get active page of the report
    const activePage: Page | undefined = pages.find((page) => page.isActive);

    if (activePage) {
      // Get all visuals in the active page of the report
      const visuals: VisualDescriptor[] = await activePage.getVisuals();

      if (visuals.length === 0) {
        // Prepare status message for Error
        this.prepareStatusMessage(errorElement, errorClass);
        this.displayMessage = 'No visuals found.';
        console.log(this.displayMessage);
        return;
      }

      // Get first visible visual
      const visual: VisualDescriptor | undefined = visuals.find((v) => v.layout.displayState?.mode === models.VisualContainerDisplayMode.Visible);

      // No visible visual found
      if (!visual) {
        // Prepare status message for Error
        this.prepareStatusMessage(errorElement, errorClass);
        this.displayMessage = 'No visible visual available to delete.';
        console.log(this.displayMessage);
        return;
      }

      try {
        // Delete the visual using powerbi-report-authoring
        // For more information: https://docs.microsoft.com/en-us/javascript/api/overview/powerbi/report-authoring-overview
        const response = await activePage.deleteVisual(visual.name);

        // Prepare status message for success
        this.prepareStatusMessage(successElement, successClass);
        this.displayMessage = `${visual.type} visual was deleted.`;
        console.log(this.displayMessage);

        return response;
      } catch (error) {
        console.error(error);
      }
    }
  }

  /**
   * Hide Filter Pane
   *
   * @returns Promise<IHttpPostMessageResponse<void> | undefined>
   */
  async hideFilterPane(): Promise<IHttpPostMessageResponse<void> | undefined> {
    // Get report from the wrapper component
    const report: Report = this.reportObj.getReport();

    if (!report) {
      // Prepare status message for Error
      this.prepareStatusMessage(errorElement, errorClass);
      this.displayMessage = 'Report not available.';
      console.log(this.displayMessage);
      return;
    }

    // New settings to hide filter pane
    const settings = {
      panes: {
        filters: {
          expanded: false,
          visible: false,
        },
      },
    };

    try {
      const response = await report.updateSettings(settings);

      // Prepare status message for success
      this.prepareStatusMessage(successElement, successClass);
      this.displayMessage = 'Filter pane is hidden.';
      console.log(this.displayMessage);

      return response;
    } catch (error) {
      console.error(error);
      return;
    }
  }

  /**
   * Set data selected event
   *
   * @returns void
   */
  setDataSelectedEvent(): void {
    // Adding dataSelected event in eventHandlersMap
    this.eventHandlersMap = new Map<string, (event?: service.ICustomEvent<any>) => void>([
      ...this.eventHandlersMap,
      ['dataSelected', (event) => console.log(event)],
    ]);

    // Prepare status message for success
    this.prepareStatusMessage(successElement, successClass);
    this.displayMessage = 'Data Selected event set successfully. Select data to see event in console.';
  }

  /**
   * Prepare status message while using JS SDK APIs
   * @param img Image to show with the display message
   * @param type Type of the message
   *
   * @returns void
   */
  prepareStatusMessage(img: HTMLImageElement, type: string) {
    // Prepend Image to the display message
    this.statusRef.nativeElement.prepend(img);

    // Add class to the display message
    this.statusRef.nativeElement.classList.add(type);
  }

}



