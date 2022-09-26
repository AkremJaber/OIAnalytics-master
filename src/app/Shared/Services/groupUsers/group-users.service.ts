import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GroupUsersService {

  constructor(private http: HttpClient) { }

  readonly getGrpUsers= 'https://localhost:44361/api/Tenants/GroupUsers';

  getGroupUsers(ccC_WorkspaceId:any){
    const postData = {
      ccC_WorkspaceId: ccC_WorkspaceId
    }
    return this.http.get(this.getGrpUsers,{params:postData})
  }
}
