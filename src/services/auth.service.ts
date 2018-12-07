import {Injectable} from '@angular/core';
import {Observable, BehaviorSubject} from "rxjs/Rx";
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import {Router} from "@angular/router";

import { Storage } from '@ionic/storage';

@Injectable()
export class AuthService {

  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;
  private authenticationstate: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

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
              this.authenticationstate.next(true);
            }
            else {
              this.authenticationstate.next(false);
            }
          }
        );
    }

  signInWithEmail(email, password) {
    return this._firebaseAuth.auth.signInWithEmailAndPassword(email, password);
  }

  signInWithTwitter() {
      return this._firebaseAuth.auth.signInWithPopup(
        new firebase.auth.TwitterAuthProvider()
      )
    }

  signInWithFacebook() {
      return this._firebaseAuth.auth.signInWithPopup(
        new firebase.auth.FacebookAuthProvider()
      )
    }

  signInWithGoogle() {
      return this._firebaseAuth.auth.signInWithPopup(
        new firebase.auth.GoogleAuthProvider()
      )
    }

  signUp(email, password) {
  		return this._firebaseAuth.auth.createUserWithEmailAndPassword(email, password).then(
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

  isLoggedIn() {
    return this.authenticationstate.value;
  }

  logout() {
      this._firebaseAuth.auth.signOut()
      .then((res) => {
        this.userDetails == null;
        this.router.navigate(['/login'])
        }
      );
  }

  getUserprofile(): Observable<any>{
    return this.firestore.collection('users/').doc(this._firebaseAuth.auth.currentUser.uid).valueChanges();
  }

  getLocalStorageState() {
    return this.storage.get('loggedin').then((cur) => {
        return cur
    });
  }

  _setLocalStorageState(state){
    this.storage.get('loggedin').then((cur) => {
      console.log("setting local storage: " + state);
      this.storage.set('loggedin', state);
    });
  }

}
