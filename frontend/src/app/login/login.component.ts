import { Component } from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardActions, MatCardContent, MatCardModule} from '@angular/material/card';
import {NgIf} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {ApiclientService} from '../service/apiclient.service';
import {response} from 'express';
import {AuthService} from '../service/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardContent,
    MatCardModule,
    NgIf,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: any
  message: string = '';

  constructor(private formBuilder: FormBuilder,
              private apiClient: ApiclientService,
              private authService: AuthService,
              private router: Router) {}

  ngOnInit() {

    if (this.authService.isAuthenticated()) {
      this.router.navigate(['']);
    }

    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }

  submitForm(): void {
    this.apiClient.login(this.loginForm.get('username').value, this.loginForm.get('password').value).subscribe(
      {
        next: (response: any) => {
          if (!response) {
            this.message = "Invalid credentials.";
          }
          else {
            this.authService.saveToken(response.token);
            this.message = "Login successful!";
            this.router.navigate(['']);
          }
        },
        error: (error: any) => {}
      }
    )
  }
}
