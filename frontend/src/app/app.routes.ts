import { Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {SignupComponent} from './signup/signup.component';
import {EmployeeComponent} from './employee/employee.component';
import {CreateEmployeeComponent} from './create-employee/create-employee.component';
import {UpdateEmployeeComponent} from './update-employee/update-employee.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'employees', component: EmployeeComponent},
  {path: 'employees/create', component: CreateEmployeeComponent},
  {path: 'employees/update/:id', component: UpdateEmployeeComponent},
];
