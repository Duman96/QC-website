import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";

@Injectable()
export class UserService {
 
  // http options used for making API calls
  private httpOptions: any;
 
  // the actual JWT token
  public token: string;
 
  // the token expiration date
  public token_expires: Date;
 
  // the username of the logged in user
  public username: string;
 
  // error messages received from the login attempt
  public errors: any = [];

  private loggedin = JSON.parse(localStorage.getItem('loggedin') || 'false'); 
 
  constructor(private http: HttpClient, private router: Router ) {
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
  }

  setLoggedIn(value: boolean){
    this.loggedin = value;
    localStorage.setItem('loggedin', value.toString());
  }

  get isLoggedIn(){
    return JSON.parse(localStorage.getItem('loggedin') || this.loggedin.toString());
  }
 
  // Uses http.post() to get an auth token from djangorestframework-jwt endpoint
  public login(user) {
    console.log(user.username);
    this.http.post('http://127.0.0.1:8000/api/auth/login/', JSON.stringify(user), this.httpOptions).subscribe(
      data => {
        this.updateData(data['token']);
        this.setLoggedIn(true);
        this.router.navigate(['']);
        localStorage.setItem('currentUser', JSON.stringify(user));
        let authString = 'Basic ' + btoa(user.username + ':' + user.password);
        localStorage.setItem('basicauth', authString);
        localStorage.setItem('token', this.token);
      },
      err => {
        this.errors = err['error'];
      }
    );
  }
 
  // Refreshes the JWT token, to extend the time the user is logged in
  // public refreshToken() {
  //   this.http.post('/api-token-refresh/', JSON.stringify({token: this.token}), this.httpOptions).subscribe(
  //     data => {
  //       this.updateData(data['token']);
  //     },
  //     err => {
  //       this.errors = err['error'];
  //     }
  //   );
  // }
 
  public logout() {
    this.token = null;
    this.token_expires = null;
    this.username = null;
    this.router.navigate(['header']);
    localStorage.removeItem('currentuser');
    this.setLoggedIn(false);
  }
 
  private updateData(token) {
    this.token = token;
    this.errors = [];
 
    // decode the token to read the username and expiration timestamp
    const token_parts = this.token.split(/\./);
    const token_decoded = JSON.parse(window.atob(token_parts[1]));
    this.token_expires = new Date(token_decoded.exp * 1000);
    this.username = token_decoded.username;
  }




}