import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean;               // {1}
  public profile;

  constructor(private authService: UserService, private profileService: ProfileService) { }

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn; // {2}
    this.getProfile();
  }

  logout() {
    this.authService.logout();
  }

  getProfile() {
    this.profileService.list().subscribe(
      // the first argument is a function which runs on success
      data => {
        this.profile = data;
        console.log(this.profile);
      },
      // the second argument is a function which runs on error
      err => console.error(err),
      // the third argument is a function which runs on completion
      () => console.log('done loading profile')

    );
  }

}
