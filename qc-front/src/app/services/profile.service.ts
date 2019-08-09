import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { UserService } from './user.service';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  thumbnailFetchUrl : any;

  constructor(private http: HttpClient, private userService: UserService) { }

  list(){
    return this.http.get('http://127.0.0.1:8000/api/current/');
  }

  getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + this.userService.token
      })
    };
  }
}
