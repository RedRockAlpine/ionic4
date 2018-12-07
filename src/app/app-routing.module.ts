import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from '../services/auth-guard.service';
import {LoginGuard} from '../services/login-guard.service';

const routes: Routes = [
  { path: ''          , redirectTo:   'dashboard', pathMatch: 'full'},
  { path: 'login'     , loadChildren: './login/login.module#LoginPageModule', canActivate: [LoginGuard] },
  { path: 'dashboard' , loadChildren: './dashboard/dashboard.module#DashboardPageModule', canActivate: [AuthGuard] },
  { path: 'signup'    , loadChildren: './signup/signup.module#SignupPageModule', canActivate: [LoginGuard] },
  { path: 'welcome'   , loadChildren: './welcome/welcome.module#WelcomePageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], //, { enableTracing: true } -> Debugging
  exports: [RouterModule]
})
export class AppRoutingModule { }
