import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatasetService {

  constructor(private http: HttpClient) { }

  readonly dataset="https://localhost:44361/api/EmbeddedDataSet";


  deleteDataset(CCC_WorkspaceId:any,DataSetId:any){
    return this.http.delete(this.dataset+'/'+CCC_WorkspaceId+'/'+DataSetId,{responseType:'text'})
  }
}
