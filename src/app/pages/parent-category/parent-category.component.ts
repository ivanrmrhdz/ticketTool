import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { find } from 'rxjs';

@Component({
  selector: 'app-parent-category',
  imports: [FormsModule, JsonPipe],
  templateUrl: './parent-category.component.html',
  styleUrl: './parent-category.component.css'
})
export class ParentCategoryComponent implements OnInit {
  masterSrv = inject(MasterService);
  gridList: any[] = [];
  departmentList: any[] = []; 
  newObj: any = {
    "categoryId": 0,
    "categoryName": "",
    "deptId": 0, 
    "deptName":""
  }
  itemSelected:any = {
    "deptId": 0,
    "deptName": "",
    "createdDate": ""
  }
  ngOnInit(): void {
    this.getDridData();
    this.getAllDepartment(); 
  }

  getAllDepartment() {
    this.masterSrv.getAllDepartment().subscribe((res: any) => {
      this.departmentList = res.data; 
      console.log(this.departmentList);
    })
  }

  getDridData() {
    this.masterSrv.getAllPCategory().subscribe((res: any) => {
      this.gridList = res.data;
      console.log(this.gridList);
    })
  }

  create() {
    this.masterSrv.createNewPCategory(this.newObj).subscribe((res: any) => {
debugger; 
      if (res.result) {
        alert("Parent Category Created Successfully");
        this.getDridData();
      } else {
        alert(res.message)
      }
    })
  }

  onEdit(data: any) {
    this.newObj = Object.assign(this.newObj, data);
    this.findDepartmentId(); 
    console.log(this.newObj);
  }

  update() {

    this.masterSrv.updatePCategory(this.newObj).subscribe((res: any) => {
      if (res.result) {
        alert("Parent Category Updated Successfully");
        this.getDridData();
      } else {
        alert(res.message)
      }
    })
  }

  onDelete(id: number) {
    const confirmDelete = confirm("Are you sure want Delete?");
    if (confirmDelete) {
      this.masterSrv.deletePCategoryById(id).subscribe((res: any) => {
        if (res.result) {
          alert("Parent Category Deleted");
          this.getDridData();
        } else {
          alert(res.message)
        }
      })
    }
  }
  onReset(){
    this.newObj = {
      "categoryId": 0,
      "categoryName": "",
      "deptId": 0
    }
  }
  onChangeDepartment(){
    this.findDepartmentId(); 
  }

  findDepartmentId(){
  
   this.newObj.deptId = this.departmentList.find((deparment)=>{
     return deparment.deptName == this.newObj.deptName; 
    }).deptId; 
  }
}
