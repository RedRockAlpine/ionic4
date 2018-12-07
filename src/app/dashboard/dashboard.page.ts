import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs-compat/Observable';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  user: {};
  subscription: Subscription;

  constructor(
    private authService: AuthService
  ){
    console.log(this.authService.isLoggedIn());
  }

  logout(){
    this.authService.logout();
  }

  ngOnInit(){
    this.subscription = this.authService.getUserprofile().subscribe(
      v => this.user = v
    );
  }

  ngOnDestroy() {
    // Only need to unsubscribe if its a multi event Observable
    this.subscription.unsubscribe();
  }


}
