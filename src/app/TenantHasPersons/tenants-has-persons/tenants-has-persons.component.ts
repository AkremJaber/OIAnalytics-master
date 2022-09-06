import { Component, OnInit } from '@angular/core';
import { TenantsHasPersonsService } from 'src/app/Shared/Services/TenantsHasPersonsService/tenants-has-persons.service';

@Component({
  selector: 'app-tenants-has-persons',
  templateUrl: './tenants-has-persons.component.html',
  styleUrls: ['./tenants-has-persons.component.css']
})
export class TenantsHasPersonsComponent implements OnInit {

  constructor(public service:TenantsHasPersonsService) { }
  // public thp:any;
  // public t:any;

  // delThpForm(id:any){
  //   this.service.deleteTHP(id).subscribe((res)=>{
  //     console.warn(res)
  //   })
  //  }
  deleteTHP(id:any){
    console.log(id)
    if(confirm('Are you sure you want to delete this record ?'))
    {
    this.service.deleteTHP(id).subscribe()
    }
  }
  
  ngOnInit(): void {
    //this.service.getTHPbyUID('');
    this.service.refreshList();
    
    //this.service.deleteTHP(''); 
  }
  // onDelete(id:any): void {
  //   this.service.deleteTHP(id);
  // }

}
