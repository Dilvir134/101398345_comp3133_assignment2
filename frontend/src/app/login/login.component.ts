import { Component } from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardActions, MatCardContent, MatCardModule} from '@angular/material/card';
import {NgIf} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {ApiclientService} from '../service/apiclient.service';
import {response} from 'express';

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

  constructor(private formBuilder: FormBuilder, private apiClient: ApiclientService) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }

  submitForm(): void {
    this.apiClient.login(this.loginForm.username, this.loginForm.password).subscribe(
      {
        next: (response: any) => {
          if (response.login == false) {
            alert("Failed to login");
          }
          else {
            alert(response.login);
          }
        },
        error: (error: any) => {}
      }
    )
  }
}
