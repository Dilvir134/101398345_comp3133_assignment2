import { Component } from '@angular/core';
import {AuthService} from '../service/auth.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private authService: AuthService) { }

  logout() {
    this.authService.logout();
  }
}
