import { Component, inject, model, OnInit } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-ticket-list',
  imports: [DatePipe],
  templateUrl: './ticket-list.component.html',
  styleUrl: './ticket-list.component.css'
})
export class TicketListComponent implements OnInit {

  tab: string = "My Tickets";
  ticketList: any[] = [];

  masterSrv = inject(MasterService);
  loggedEmployeeId: any;

  ngOnInit(): void {
    const loggedUserData = localStorage.getItem('ticketUser');
    if (loggedUserData !== null) {
      const userData = JSON.parse(loggedUserData);
      this.loggedEmployeeId = userData.employeeId;
    }

    this.changeTab(this.tab);
  }

  changeTab(tab: string) {
    this.tab = tab;
    if (tab == 'My Tickets') {
      this.masterSrv.getTicketsCreatedByLoggedEmployee(this.loggedEmployeeId).subscribe((res: any) => {
        this.ticketList = res.data

      });
    } else {
      this.masterSrv.getTicketAssignedToEmployee(this.loggedEmployeeId).subscribe((res: any) => {
        this.ticketList = res.data

      });
    }
  }

  changeStatus(state:string, ticketId:number){
    if(state == 'start'){
      this.masterSrv.startTicket(ticketId).subscribe((res:any)=>{
        if(res.result){
          alert("Ticket Started")
          this.changeTab(this.tab);
        }else{
          alert(res.message)
        }
      })
    }else{
      this.masterSrv.closeTicket(ticketId).subscribe((res:any)=>{
        if(res.result){
          alert("Ticket Closed Success"); 
          this.changeTab(this.tab);
        }else{
          alert(res.message)
        }
      })
    }
  }
}
