import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { UserService } from '../services/user.service';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;
  constructor(private userService: UserService, private router: Router){}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>| boolean {
    if (this.userService.isLoggedIn) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
    // return this.userService.isLoggedIn.pipe(
    //   take(1),
    //   map((isLoggedIn: boolean) => {
    //     if (!isLoggedIn) {
    //       this.router.navigate(['login']);
    //       return false;
    //     }
    //     return true;
    //   })
    // );
  }
}

