import {tap, take, map} from 'rxjs/operators';

import {AuthService} from "./auth.service";

import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {Observable} from "rxjs/Rx";
import {Injectable} from "@angular/core";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
      private authService: AuthService,
      private router: Router
    ) {

    }

    canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot){

                  if ( this.authService.isLoggedIn() ) {
                      return true;
                  }
                  this.router.navigate(['/login']);
                  return false;
    }

}
