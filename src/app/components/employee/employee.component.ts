import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { NgForm } from '@angular/forms';
import { Employee } from 'src/app/models/employee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  constructor(
    public employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  resetForm(form: NgForm){
    form.reset();
  }

  getEmployees(){
    this.employeeService.getEmployees().subscribe(
      (data: any) => {
        this.employeeService.employees = data;
        console.log(data);
      },
      (error: any) => {
        console.log('Hubo un error💥', error)
      }
    );
  }

  addEmployee(form: NgForm){
    if(form.value._id){
      this.employeeService.updateEmployee(form.value).subscribe(
        (data: any) => {
          console.log('Empleado Editado⚡',data);
          this.getEmployees();
          this.resetForm(form);
        }
      );
    } else {
      this.employeeService.createEmployee(form.value).subscribe(
        (data: any) => {
          console.log('Empleado Creado⚡',data);
          this.getEmployees();
          form.reset();
        },
        (error: any) => {
          console.log('Hubo un error💥', error)
        }
      );
    }
  }

  editEmployee(employee: Employee){
    this.employeeService.selectedEmployee = employee;
  }

  deleteEmployee(id: any){
    const res = confirm('¿Estas seguro de eliminar este empleado?')
    if(res){
      this.employeeService.deleteEmployee(id).subscribe(
        (data: any) => {
          console.log('Empleado Eliminado💥',data);
          this.getEmployees();
        },
        (error: any) => {
          console.log('Hubo un error💥', error)
        }
      );
    } else {
      console.log('Cancelado');
    }

  }

}
