import {ChangeDetectorRef, Component} from '@angular/core';
import {ApiclientService} from '../service/apiclient.service';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {CurrencyPipe, DatePipe, NgIf} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../service/auth.service';

@Component({
  selector: 'app-employee',
  imports: [
    MatTableModule,
    MatButtonModule,
    DatePipe,
    CurrencyPipe,
    RouterLink,
    NgIf
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent {
  employees: any[] = [];
  displayedColumns: string[] = ['firstname', 'lastname', 'email', 'gender', 'designation', 'salary', 'department', 'doj', 'actions'];
  message = '';

  constructor(private apiClient: ApiclientService, private router: Router, private cdr: ChangeDetectorRef, private authService: AuthService) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.fetchEmployees();
    }
    else {
      this.router.navigate(['']);
    }
  }

  fetchEmployees() {
    this.apiClient.getAllEmployees().subscribe({
      next: (data) => {
        this.employees = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.message = 'Failed to load employees';
      }
    });
  }

  onUpdate(employee_id: any): void {
    this.router.navigate(['/employees/update/' + employee_id])
  }

  onDelete(employee_id: any): void {
    const confirmDelete = confirm('Are you sure you want to delete this employee?');
    if (confirmDelete) {
      this.apiClient.deleteEmployee(employee_id).subscribe({
        next: () => {
          this.fetchEmployees();  // Reload the employee list after deletion
          this.message = 'Employee deleted successfully!';
        },
        error: (err) => {
          this.message = 'Failed to delete employee';
        }
      });
    }
  }

}
