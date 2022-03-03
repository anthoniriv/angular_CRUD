import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  employees!: Employee[];
  selectedEmployee: Employee ={
    name: '',
    position: '',
    office: '',
    salary: 0
  };

  constructor(
    private http: HttpClient
  ) { }

  getEmployees(){
    return this.http.get<Employee[]>(`${environment.urlApi}`);
  }

  createEmployee(employee: Employee){
    return this.http.post(`${environment.urlApi}`, employee);
  }

  updateEmployee(employee: Employee){
    return this.http.put(`${environment.urlApi}/${employee._id}`, employee);
  }

  deleteEmployee(_id: string){
    return this.http.delete(`${environment.urlApi}/${_id}`);
  }

}
