import { Component } from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {ApiclientService} from '../service/apiclient.service';
import {Router} from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {NgIf} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {AuthService} from '../service/auth.service';

@Component({
  selector: 'app-create-employee',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    NgIf
  ],
  templateUrl: './create-employee.component.html',
  styleUrl: './create-employee.component.css'
})
export class CreateEmployeeComponent {
  employeeForm: any;
  message = '';

  constructor(
    private fb: FormBuilder,
    private apiClient: ApiclientService,
    private router: Router,
    private authService: AuthService
  ) {
    this.employeeForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      designation: ['', Validators.required],
      salary: ['', [Validators.required, Validators.min(0)]],
      dateOfJoining: ['', Validators.required],
      department: ['', Validators.required],
      employeePhoto: ['', Validators.required]
    });
  }

  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['']);
    }
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      const formValue = this.employeeForm.value;
      formValue.salary = parseFloat(formValue.salary);

      this.apiClient.addEmployee(formValue).subscribe({
        next: () => {
          this.router.navigate(['/employees']);
        },
        error: (err: any) => {
          this.message = err.message || 'Something went wrong.';
        }
      });
    }
  }
}
