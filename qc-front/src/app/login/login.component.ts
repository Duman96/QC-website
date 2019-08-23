import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import {throwError} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  public user: any;
 
  constructor(public userService: UserService) { }
 
  ngOnInit() {
    this.user = {
      username: '',
      email: '',
      password: ''
    };
  }
 
  login() {
      this.userService.login({'username': this.user.username, 'email': this.user.email, 'password': this.user.password});
  }
 
  // refreshToken() {
  //   this.userService.refreshToken();
  // }
 
  logout() {
    this.userService.logout();
  }
}