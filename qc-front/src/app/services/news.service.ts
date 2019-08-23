import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient, private userService: UserService) { }

  list(){
    // return this.http.get('http://10.189.85.221:8989/api/news/');
    return this.http.get('http://127.0.0.1:8000/api/news/');
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
