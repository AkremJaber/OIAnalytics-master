import { AfterViewInit } from "@angular/core";

class AppComponent implements AfterViewInit {
    
    ngAfterViewInit(): void {
        this.report = this.reportObj.getReport();
    }
}