import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  apiUrl: string = "https://freeapi.miniprojectideas.com/api/TicketsNew/"

  constructor(private http: HttpClient) { }

  login(obj: any) {

    return this.http.post(this.apiUrl + "Login", obj);
  }

  getAllDepartment() {
    return this.http.get(`${this.apiUrl}GetDepartments`);
  }
  createNewDepartment(obj: any) {
    return this.http.post(`${this.apiUrl}CreateDepartment`, obj);
  }
  updateDepartment(obj: any) {
    return this.http.put(`${this.apiUrl}UpdateDepartment`, obj);
  }
  deleteDepartmentById(id: number) {
    return this.http.delete(`${this.apiUrl}DeleteDepartment?id=${id}`);
  }

  getAllPCategory() {
    return this.http.get(`${this.apiUrl}GetParentCategory`)
  }
  createNewPCategory(obj: any) {
    return this.http.post(`${this.apiUrl}CreateParentCategory`, obj);
  }
  updatePCategory(obj: any) {
    return this.http.put(`${this.apiUrl}UpdateParentCategory`, obj);
  }
  deletePCategoryById(id: number) {
    return this.http.delete(`${this.apiUrl}DeleteParentCategory?id=${id}`);
  }

  getAllCCategory() {
    return this.http.get(`${this.apiUrl}GetChildCategory`);
  }
  getCCategoryByParentId(id: number) {
    return this.http.get(`${this.apiUrl}GetChildCategoryByParentId?id=${id}`);
  }
  createNewCCategory(obj: any) {
    return this.http.post(`${this.apiUrl}CreateChildCategory`, obj);
  }
  updateCCategory(obj: any) {
    return this.http.put(`${this.apiUrl}UpdateChildCategory`, obj);
  }
  deleteCCategoryById(id: number) {
    return this.http.delete(`${this.apiUrl}DeleteChildCategory?id=${id}`);
  }

  getAllRoles() {
    return this.http.get(`${this.apiUrl}GetAllRoles`)
  }

  getAllEmployee() {
    return this.http.get(`${this.apiUrl}GetEmployees`)
  }
  createNewEmployee(obj: any) {
    return this.http.post(`${this.apiUrl}CreateEmployee`, obj);
  }
  updateEmployee(obj: any) {
    return this.http.put(`${this.apiUrl}UpdateEmployee`, obj);
  }
  deleteEmployee(id: number) {
    return this.http.delete(`${this.apiUrl}DeleteEmployee?id=${id}`);
  }

  createNewTicket(obj: any) {
    return this.http.post(`${this.apiUrl}CreateNewTicket`, obj);
  }
  getTicketsCreatedByLoggedEmployee(employeeId: number) {
    return this.http.get(`${this.apiUrl}GetTicketsCreatedByEmpId?empId=${employeeId}`);
  }
  getTicketAssignedToEmployee(employeeId: number) {
    return this.http.get(`${this.apiUrl}GetAssignedTicketsByEmpId?empId=${employeeId}`);
  }

  startTicket(ticketId:number){
    return this.http.post(`${this.apiUrl}startTicket?id=${ticketId}`, {});
  }
  closeTicket(ticketId:number){
    return this.http.post(`${this.apiUrl}closeTicket?id=${ticketId}`, {});
  }
}


