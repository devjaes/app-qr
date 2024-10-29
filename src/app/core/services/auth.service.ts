import { inject, Injectable } from '@angular/core';
import {
  UserCredential,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  Auth,
} from '@angular/fire/auth';
import { User } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  auth = inject(Auth);
  constructor() {}

  async login(email: string, password: string): Promise<UserCredential> {
    const credentials = await signInWithEmailAndPassword(
      this.auth,
      email,
      password
    );

    this.saveDataInLocalStorage(credentials.user);

    return credentials;
  }

  saveDataInLocalStorage(user: User) {
    localStorage.setItem(
      'user',
      JSON.stringify({ uid: user.uid, email: user.email })
    );
  }

  getUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  isLogged(): boolean {
    return !!localStorage.getItem('user');
  }
}
