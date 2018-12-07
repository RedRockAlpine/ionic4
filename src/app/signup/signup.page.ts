import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  signupError: string;
	form: FormGroup;

	constructor(
		fb: FormBuilder,
    private authService: AuthService,
    private router: Router
	) {
		this.form = fb.group({
			email: ['', Validators.compose([Validators.required, Validators.email])],
			password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
		});
  }

  signup() {

    let data = this.form.value;

    this.authService.signUp(data.email, data.password)
      .then(
        () => {
          this.router.navigateByUrl('/welcome');
        },
        err => this.signupError = err.message
      );

  }

  ngOnInit() {
  }

}
