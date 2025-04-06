import { Component } from '@angular/core';
import {ApiclientService} from '../service/apiclient.service';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {CurrencyPipe, DatePipe} from '@angular/common';

@Component({
  selector: 'app-employee',
  imports: [
    MatTableModule,
    MatButtonModule,
    DatePipe,
    CurrencyPipe
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent {
  employees: any[] = [];
  displayedColumns: string[] = ['firstname', 'lastname', 'email', 'gender', 'designation', 'salary', 'department', 'doj', 'actions'];

  constructor(private apiClient: ApiclientService) {}

  ngOnInit(): void {
    this.apiClient.getAllEmployees().subscribe(data => {
      this.employees = data;
    });
  }

  onUpdate(employee: any): void {
    console.log('Update clicked for:', employee);
    // Navigate to update form or open dialog
  }

  onDelete(employee: any): void {
    console.log('Delete clicked for:', employee);
    // Trigger delete mutation
  }

  onCreate(): void {
    console.log('Create New Employee clicked');
    // Navigate to create form or open dialog
  }
}
