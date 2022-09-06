import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Person } from '../../Models/Person/person.model';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private http: HttpClient) { }
  readonly baseURL = 'https://localhost:44361/api/Person';
  formData:Person = new Person();
  list: Person[]; 
  p : Person;

  refreshList(){
    const res =this.http.get(this.baseURL)
    .toPromise()
    .then(res => {this.list = res as Person[]});
  }
  getPersonByuid(id:string){
    return this.http.get<Person>(this.baseURL+'/'+id)
      
  }
  
}
