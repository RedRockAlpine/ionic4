import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection} from '@angular/fire/firestore';

import { Observable, throwError } from 'rxjs';
import { Router } from "@angular/router";
import { Storage } from '@ionic/storage';

@Injectable()
export class AuthService {

  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;
  private logged_in:boolean;

	constructor(
    private _firebaseAuth: AngularFireAuth,
    public firestore: AngularFirestore,
    private router: Router,
    private storage: Storage
  ) {

    this._firebaseAuth.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);

    this.user = _firebaseAuth.authState;

    this.user.subscribe(
      (user) => {
        if (user) {
          this.storage.get('loggedin').then((loggedin) => {
            this.storage.set('loggedin', 1);
          });
          this.logged_in = true;
          this.userDetails = user;
        }else {
          this.storage.get('loggedin').then((loggedin) => {
            this.storage.set('loggedin', 0);
          });
          this.logged_in = false;
        }
      }
    );

    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.storage.get('loggedin').then((loggedin) => {
          this.storage.set('loggedin', 0);
        });
        this.logged_in = false;
      }else{
        this.logged_in = true;
      }
    });

  }

  signInWithTwitter() {
    return this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.TwitterAuthProvider()
    );
  }

  signInWithFacebook() {
    return this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.FacebookAuthProvider()
    );
  }

  signInWithGoogle() {
    return this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
  }

  signUp(credentials) {
		return this._firebaseAuth.auth.createUserWithEmailAndPassword(credentials.email,credentials.password).then(
      newUser => {
        newUser.user.getIdToken().then(token => {
          this.firestore.collection("users").doc(newUser.user.uid).set({
            email: newUser.user.email,
            token: token
          });
        });
      }
    );
  }

	signInWithEmail(email, password) {
		console.log('Sign in with email');
    return this._firebaseAuth.auth.signInWithEmailAndPassword(email, password);
	}

  resetPassword(email: string): Promise<void> {
    return this._firebaseAuth.auth.sendPasswordResetEmail(email);
  }

  get authenticated(): boolean {
    return (this._firebaseAuth.auth.currentUser == null) ? false : true;
  }

  get currentUserObservable(): any {
    return this._firebaseAuth.auth;
  }

  logOut() {
    return this._firebaseAuth.auth.signOut().then(
        (res) => {
          this.storage.get('loggedin').then((loggedin) => {
            this.storage.set('loggedin', 0);
          });
          this.router.navigateByUrl('/login');
        }
      );
  }

  getUserprofile(): Observable<any>{
    return this.firestore.collection('users/').doc(this.userDetails.uid).valueChanges();
  }

}
