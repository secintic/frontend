import {Injectable} from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';

import {TOKEN_NAME} from '../services/auth.constant';
import { User } from '../models/user';

@Injectable()
export class UserService {
  jwtHelper: JwtHelperService = new JwtHelperService();
  accessToken: string;
  isAdmin: boolean;

  constructor(private http: HttpClient) { }

  login(accessToken: string) {
    const decodedToken = this.jwtHelper.decodeToken(accessToken);
    this.isAdmin = decodedToken.authorities.some(el => el === 'ADMIN_USER');
    this.accessToken = accessToken;
    localStorage.setItem(TOKEN_NAME, accessToken);
  }
  create(user: User) {
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
  isAuthed(): boolean {
    return this.accessToken != null;
  }
}
