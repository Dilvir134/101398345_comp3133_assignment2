import { Component } from '@angular/core';
import {AuthService} from '../service/auth.service';
import {Router} from '@angular/router';
import {ApiclientService} from '../service/apiclient.service';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardContent, MatCardModule} from '@angular/material/card';
import {NgIf} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-signup',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardContent,
    MatCardModule,
    NgIf,
    MatButtonModule,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupForm: any;
  message = '';

  constructor(private authService: AuthService,
              private router: Router,
              private apiClient: ApiclientService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['']);
    }

    this.signupForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
    })
  }

  submitForm(){
    this.apiClient.signup(this.signupForm.get('username').value,
      this.signupForm.get('password').value,
      this.signupForm.get('email').value).subscribe(
      {
        next: (response: any) => {
          if (response) {
            this.authService.saveToken(response.token);
            this.router.navigate(['']);
          }
        },
        error: (error: any) => {
          this.message = error.message;
        }
      }
    )
  }
}
