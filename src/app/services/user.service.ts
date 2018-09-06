import {Injectable} from '@angular/core';
import {JwtHelper} from 'angular2-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {TOKEN_NAME} from '../services/auth.constant';
import { User } from '../models/user';

@Injectable()
export class UserService {
  jwtHelper: JwtHelper = new JwtHelper();
  accessToken: string;
  isAdmin: boolean;

  constructor(private http: HttpClient) { }

  login(accessToken: string) {
    const decodedToken = this.jwtHelper.decodeToken(accessToken);
    console.log(decodedToken);

    this.isAdmin = decodedToken.authorities.some(el => el === 'ADMIN_USER');
    this.accessToken = accessToken;

    localStorage.setItem(TOKEN_NAME, accessToken);
  }
  create(user: User) {
    console.log(user)
    return this.http.post('/springjwt/save/user', user)
}
  logout() {
    this.accessToken = null;
    this.isAdmin = false;
    localStorage.removeItem(TOKEN_NAME);
  }

  isAdminUser(): boolean {
    return this.isAdmin;
  }

  isUser(): boolean {
    return this.accessToken && !this.isAdmin;
  }
}
