import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee',
  imports: [FormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {
  masterSrv = inject(MasterService);
  isNewView:boolean = false; 
  gridList: any[] = [];
  departmentList: any[] = []; 
  roleList:any[] = []; 

  parentCategoryList: any[] = [];
  newObj: any = {
    "employeeId": 0,
    "employeeName": "",
    "contactNo": "",
    "emailId": "",
    "deptId": 0,
    "password": "",
    "gender": "",
    "role": ""
  }
  ngOnInit(): void {
    this.getDridData();
    this.getAllDepartment();
    this.getAllRoles(); 
  }

  getAllDepartment() {
    this.masterSrv.getAllDepartment().subscribe((res: any) => {
      this.departmentList = res.data;
      console.log(this.departmentList);
    })
  }

  getAllRoles(){
    this.masterSrv.getAllRoles().subscribe((res: any) => {
      this.roleList = res.data;
      console.log(this.roleList);
    })
  }

  getDridData() {
    this.masterSrv.getAllEmployee().subscribe((res: any) => {
      //order on ascending based on Id
      this.gridList = res.data.sort((a:any,b:any)=>a.employeeId-b.employeeId);
      console.log(this.gridList);
    })
  }

  create() {
    this.masterSrv.createNewEmployee(this.newObj).subscribe((res: any) => {

      if (res.result) {
        alert("Employee Created Successfully");
        this.getDridData();
        this.onReset(); 
      } else {
        alert(res.message)
      }
    })
  }

  onEdit(data: any) {
    this.newObj = Object.assign(this.newObj, data);
    // this.findParentCategoryId();
  }

  update() {
    this.masterSrv.updateEmployee(this.newObj).subscribe((res: any) => {
      if (res.result) {
        alert("Employee Updated Successfully");
        this.getDridData();
      } else {
        alert(res.message)
      }
    })
  }

  onDelete(id: number) {
    const confirmDelete = confirm("Are you sure want Delete?");
    if (confirmDelete) {
      this.masterSrv.deleteEmployee(id).subscribe((res: any) => {
        if (res.result) {
          alert("Employee Deleted");
          this.getDridData();
        } else {
          alert(res.message)
        }
      })
    }
  }
  onReset() {
    this.newObj = {
      "employeeId": 0,
      "employeeName": "",
      "contactNo": "",
      "emailId": "",
      "deptId": 0,
      "password": "",
      "gender": "",
      "role": ""
    }
  }

  // findParentCategoryId() {
  //   const checkID: any = this.parentCategoryList.find((category) => {
  //     return category.categoryName == this.newObj.parentCategoryName;
  //   });

  //   if (checkID === undefined) {
  //     alert(`The parent category: ${this.newObj.parentCategoryName} didn't loger exists on database`)
  //   } else {
  //     this.newObj.parentCategoryId = this.parentCategoryList.find((category) => {
  //       return category.categoryName == this.newObj.parentCategoryName;
  //     }).categoryId;
  //   }

  // }
}
