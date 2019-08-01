import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { UserService } from '../services/user.service';
import { Observable } from "rxjs";
import { Ng2ImgMaxService } from 'ng2-img-max';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public profile;
  // imageBlobUrl: any;
  // uploadedImage: Blob;

  constructor(private profileService: ProfileService, private userService: UserService) { }

  ngOnInit() {
    this.getProfile();
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

  // getThumbnail() : void {
  //   this.profileService.getBlobThumbnail()
  //     .subscribe((val) => {
  //         this.createImageFromBlob(val);
  //       },
  //       response => {
  //         console.log("POST - getThumbnail - in error", response);
  //       },
  //       () => {
  //         console.log("POST - getThumbnail - observable is now completed.");
  //       });
  // }
  // createImageFromBlob(image: Blob) {
  //   let reader = new FileReader();
  //   reader.addEventListener("load", () => {
  //     this.imageBlobUrl = reader.result;
  //   }, false);
  //   if (image) {
  //     reader.readAsDataURL(image);
  //   }
  // }

  // onImageChange(event){
  //   let image = event.target.files[0];

  // this.ng2ImgMax.resizeImage(image, 400, 300).subscribe(
  //   result => {
  //     this.uploadedImage = result;
  //   },
  //   error => {
  //     console.log('😢 Oh no!', error);
  //   }
  // );
  // }

}
