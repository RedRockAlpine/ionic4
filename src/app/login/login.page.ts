import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  loginError: string;

  constructor(
    private authService: AuthService,
    fb: FormBuilder,
    private router: Router
  ) {

    this.loginForm = fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });

  }

  loginWithGoogle(){

  }

  login() {

		let data = this.loginForm.value;

		if (!data.email) {
			return;
		}

    this.authService.signInWithEmail(data.email, data.password)
      .then(
        () => this.router.navigate(['/dashboard']),
        err => this.loginError = err.message
    );

  }

  signup(){
    this.router.navigateByUrl('/signup');
  }

  ngOnInit(){
    
    }
  }

}
