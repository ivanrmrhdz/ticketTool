import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-department',
  imports: [DatePipe, FormsModule],
  templateUrl: './department.component.html',
  styleUrl: './department.component.css'
})
export class DepartmentComponent implements OnInit {

  masterSrv = inject(MasterService);
  departmentList: any[] = [];
  newDepartmentObj: any = {
    "deptId": 0,
    "deptName": "",
    "createdDate": ""
  }
  ngOnInit(): void {
    this.getDepartments();
  }

  getDepartments() {
    this.masterSrv.getAllDepartment().subscribe((resr: any) => {
      this.departmentList = resr.data;
      console.log(this.departmentList);
    })
  }

  createDepartment() {
    this.masterSrv.createNewDepartment(this.newDepartmentObj).subscribe((res: any) => {

      if (res.result) {
        alert("Department Created Successfully");
        this.getDepartments();
      } else {
        alert(res.message)
      }
    })
  }

  onEdit(data:any){
    this.newDepartmentObj = data; 
  }

  updateDepartment() {
    this.masterSrv.updateDepartment(this.newDepartmentObj).subscribe((res: any) => {
      if (res.result) {
        alert("Department Updated Successfully");
        this.getDepartments();
      } else {
        alert(res.message)
      }
    })
  }

  onDelete(id:number){
    const confirmDelete = confirm("Are you sure want Delete?"); 
    if(confirmDelete){
      this.masterSrv.deleteDepartmentById(id).subscribe((res: any) => {
        if (res.result) {
          alert("Department Deleted");
          this.getDepartments();
        } else {
          alert(res.message)
        }
      })
    }
  }
}
