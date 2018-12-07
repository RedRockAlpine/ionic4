import {tap, take, map} from 'rxjs/operators';

import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {Observable} from "rxjs/Rx";
import {Injectable} from "@angular/core";

import {AuthService} from "./auth.service";

@Injectable()
export class LoginGuard implements CanActivate {

    constructor(
      private authService: AuthService,
      private router: Router
    ) {

    }

    canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot){
          
              if (!this.authService.isLoggedIn()) {
                return true;
              }

              this.router.navigate(['/dashboard']);
              return false;
    }

}
