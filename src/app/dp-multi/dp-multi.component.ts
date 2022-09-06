import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Person } from '../Shared/Models/Person/person.model';
import { DropDownService } from '../Shared/Services/DropDown/drop-down.service';

// interface PersonsList {  
//   FirstName: String;  
//   LastName: String; 
//   uiD_Person: String 
// } 
 
@Component({
  selector: 'app-dp-multi',
  templateUrl: './dp-multi.component.html',
  styleUrls: ['./dp-multi.component.css']
})
export class DpMultiComponent implements OnInit {

  constructor(public service:DropDownService) { }
  public thp:any;
  public t:any;
  //perso: PersonsList[];

  get(){
    this.service.getPersons().subscribe((res: any)=>
      {
        this.thp=res
        //console.log(res)
      }
      );
   } 

   getT(){
    this.service.getTenants().subscribe((res: any)=>
      {
        this.t=res
        //console.log(res)
      }
      );
   } 
   
   mySelect = [];
   selectedValue:any;
   selectChange() {
       this.selectedValue = this.service.getDropDownText(this.mySelect,this.thp );
   }

   mySelectTenant = [];
   selectedValueTenant: any;
   selectChangeTenant() {
       this.selectedValueTenant = this.service.getDropDownTextTenant(this.mySelectTenant,this.t );
   }

   getThpForm(a:any,b:any){
    a=this.selectedValue[0].uiD_Person
    b=this.selectedValueTenant[0].uiD_CCCTenants
    this.service.saveTHp(a,b).subscribe((res)=>{
      console.warn(res)
    })
   }

ngOnInit(): void {
    //this.service.saveTHP("").subscribe();
    this.service.getPersons().subscribe();
    this.service.getTenants().subscribe();
    this.get();
    this.getT();
  }
  
  

}
