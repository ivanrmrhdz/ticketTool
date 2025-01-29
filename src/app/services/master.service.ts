import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  apiUrl: string = "https://freeapi.miniprojectideas.com/api/TicketsNew/"

  constructor(private http: HttpClient) { }

  login(obj: any) {

    return this.http.post(this.apiUrl + "Login", obj)
  }

  getAllDepartment() {
    return this.http.get(`${this.apiUrl}GetDepartments`)
  }
  createNewDepartment(obj: any) {
    return this.http.post(`${this.apiUrl}CreateDepartment`, obj)
  }
  updateDepartment(obj: any) {
    return this.http.put(`${this.apiUrl}UpdateDepartment`, obj)
  }
  deleteDepartmentById(id: number) {
    return this.http.delete(`${this.apiUrl}DeleteDepartment?id=${id}`)
  }

  getAllPCategory() {
    return this.http.get(`${this.apiUrl}GetParentCategory`)
  }
  createNewPCategory(obj: any) {
    return this.http.post(`${this.apiUrl}CreateParentCategory`, obj)
  }
  updatePCategory(obj: any) {
    return this.http.put(`${this.apiUrl}UpdateParentCategory`, obj)
  }
  deletePCategoryById(id: number) {
    return this.http.delete(`${this.apiUrl}DeleteParentCategory?id=${id}`)
  }
}

