import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

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
