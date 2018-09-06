import {Injectable} from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable()
export class AppDataService {
  constructor(private http: HttpClient) {
  }

  getCities() {
    return this.http.get('/springjwt/app/cities');
  }
  getUsers() {
    return this.http.get('/springjwt/app/users');
  }
}
