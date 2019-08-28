import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { UserService } from '../services/user.service';
import { Observable } from "rxjs";
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router';
import { del } from 'selenium-webdriver/http';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  public edit;
  public profile;

  constructor(private profileService: ProfileService, private userService: UserService, private router: Router, ) { }

  ngOnInit() {
    this.getProfile();
  }

  getProfile() {
    this.profileService.list().subscribe(
      // the first argument is a function which runs on success
      data => {
        this.edit = data;
        console.log(this.edit);
      },
      // the second argument is a function which runs on error
      err => console.error(err),
      // the third argument is a function which runs on completion
      () => console.log('done loading profile')

    );
  }

  updateProfile(): void {
    delete(this.edit.profile.photo)
    console.log(this.edit);
    this.profileService.updateProfile(this.edit).subscribe(
      () => {
        this.router.navigate(['profile']);
        console.log('success');
        this.router.navigate(['edit']);
      }
    );
  }

  updateProfilePic(): void {
    this.profileService.updateProfilePic(this.edit).subscribe(
      () => {
        this.router.navigate(['edit']);
        console.log('success pic');
      }
    );
  }

  refresh(): void {
    window.location.reload();
}

}
