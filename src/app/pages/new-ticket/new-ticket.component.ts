import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-ticket',
  imports: [FormsModule],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css'
})
export class NewTicketComponent implements OnInit {

  masterSrv = inject(MasterService);

  departmentList: any[] = [];
  parentCategoryList: any[] = [];
  childCategoryList: any[] = [];
  parentCategoryId:number = 0; 
  newTicketObj: any = {
    "employeeId": 0,
    "severity": "",
    "childCategoryId": 0,
    "deptId": "",
    "requestDetails": ""
  };

  ngOnInit(): void {
    const loggedUserData = localStorage.getItem('ticketUser'); 
    if(loggedUserData !== null){
      const userData = JSON.parse(loggedUserData); 
      this.newTicketObj.employeeId = userData.employeeId; 
    }
    this.getDepartment(); 
    this.getPCategory(); 
   
  }

  getDepartment() {
    this.masterSrv.getAllDepartment().subscribe((res:any)=>{
      this.departmentList = res.data;
      console.log('Department List', this.departmentList);  
    })
  }

  getPCategory() {
    this.masterSrv.getAllPCategory().subscribe((res:any)=>{
      this.parentCategoryList = res.data;
      console.log('Parent Category List', this.parentCategoryList);  
    })
  }

  getCCategoryByPId(id:number) {
    this.masterSrv.getCCategoryByParentId(id).subscribe((res:any)=>{
      this.childCategoryList = res.data;
      console.log('Child category List', this.childCategoryList);  
    })
  }

  onParentChange(){
    this.getCCategoryByPId(this.parentCategoryId); 

  }

  onCreateTicket(){
    this.masterSrv.createNewTicket(this.newTicketObj).subscribe((res: any) => {
     
            if (res.result) {
              console.log(res);
              alert("Ticket Created Successfully");
             
            } else {
              alert(res.message)
            }
          })
  }
}
