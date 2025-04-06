import { Component } from '@angular/core';
import {NgIf} from '@angular/common';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import {ApiclientService} from '../service/apiclient.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-update-employee',
  imports: [
    NgIf,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule
  ],
  templateUrl: './update-employee.component.html',
  styleUrl: './update-employee.component.css'
})
export class UpdateEmployeeComponent {

  employeeForm: any

  constructor(
    private fb: FormBuilder,
    private apiClient: ApiclientService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.employeeForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      gender: ['', Validators.required],
      designation: ['', Validators.required],
      salary: ['', [Validators.required, Validators.min(0)]],
      dateOfJoining: ['', Validators.required],
      department: ['', Validators.required],
      employeePhoto: ['', Validators.required]
    });
  }


  id = '';
  message = '';

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.apiClient.getEmployeeById(this.id).subscribe({
      next: (data) => {
        this.employeeForm.patchValue({
          firstname: data.firstname,
          lastname: data.lastname,
          gender: data.gender,
          designation: data.designation,
          salary: data.salary,
          dateOfJoining: data.date_of_joining,
          department: data.department,
          employeePhoto: data.employee_photo
        });
      },
      error: (err) => {
        this.message = err.message;
      }
    });
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      const formValue = this.employeeForm.value;
      this.apiClient.updateEmployee({
        id: this.id,
        ...formValue,
        salary: parseFloat(formValue.salary as any)
      }).subscribe({
        next: () => {
          this.router.navigate(['/employees']);
        },
        error: (err) => {
          this.message = err.message;
        }
      });
    }
  }
}
