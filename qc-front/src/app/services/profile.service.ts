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
    //return this.http.get('http://10.189.85.221:8989/api/current/');
    return this.http.get('http://127.0.0.1:8000/api/current/' , {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + this.userService.token
      })
    });
  }

  updateProfile(profile): Observable<any> {
    return this.http.patch('http://127.0.0.1:8000/api/users/current/', profile, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + this.userService.token
      })
    })
  }

  updateProfilePic(profile): Observable<any> {
    return this.http.patch('http://127.0.0.1:8000/api/users/current/', profile, {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data',
        'Authorization': 'JWT ' + this.userService.token
      })
    })
  }
}
