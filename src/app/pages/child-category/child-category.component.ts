import { Component, inject } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-child-category',
  imports: [FormsModule],
  templateUrl: './child-category.component.html',
  styleUrl: './child-category.component.css'
})
export class ChildCategoryComponent {
  masterSrv = inject(MasterService);
  gridList: any[] = [];
  parentCategoryList: any[] = [];
  newObj: any = {
    "childCategoryId": 0,
    "categoryName": "",
    "parentCategoryId": 0,
    "parentCategoryName": "",
  }
  ngOnInit(): void {
    this.getDridData();
    this.getParentCategory();
  }

  getParentCategory() {
    this.masterSrv.getAllPCategory().subscribe((res: any) => {
      this.parentCategoryList = res.data;
      console.log(this.parentCategoryList);
    })
  }

  getDridData() {
    this.masterSrv.getAllCCategory().subscribe((res: any) => {
      this.gridList = res.data;
      console.log(this.gridList);
    })
  }

  create() {
    this.masterSrv.createNewCCategory(this.newObj).subscribe((res: any) => {

      if (res.result) {
        alert("Child Category Created Successfully");
        this.getDridData();
      } else {
        alert(res.message)
      }
    })
  }

  onEdit(data: any) {
    this.newObj = Object.assign(this.newObj, data);
    this.findParentCategoryId();
  }

  update() {
    this.masterSrv.updateCCategory(this.newObj).subscribe((res: any) => {
      if (res.result) {
        alert("Child Category Updated Successfully");
        this.getDridData();
      } else {
        alert(res.message)
      }
    })
  }

  onDelete(id: number) {
    const confirmDelete = confirm("Are you sure want Delete?");
    if (confirmDelete) {
      this.masterSrv.deleteCCategoryById(id).subscribe((res: any) => {
        if (res.result) {
          alert("Child Category Deleted");
          this.getDridData();
        } else {
          alert(res.message)
        }
      })
    }
  }
  onReset() {
    this.newObj = {
      "childCategoryId": 0,
      "categoryName": "",
      "parentCategoryId": 0
    }
  }
  onChangeDepartment() {
    this.findParentCategoryId();
  }

  findParentCategoryId() {
    const checkID: any = this.parentCategoryList.find((category) => {
      return category.categoryName == this.newObj.parentCategoryName;
    });

    if (checkID === undefined) {
      alert(`The parent category: ${this.newObj.parentCategoryName} didn't loger exists on database`)
    } else {
      this.newObj.parentCategoryId = this.parentCategoryList.find((category) => {
        return category.categoryName == this.newObj.parentCategoryName;
      }).categoryId;
    }

  }
}
