import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginUser } from '../loginUser';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

// The service to handle the authentication within the app
@Injectable()
export class AuthenticationService {

  private authUrl: string;

  constructor(private httpClient: HttpClient) {
    this.authUrl = 'http://localhost:8089/api/v1/auth/login/';
  }

  // Rest call to get access token by giving username and password
  authenticateUser(data) {
    return this.httpClient.post(this.authUrl, data);
  }

  // Set the bearer token to application local storage of the app
  setBearerToken(token) {
    localStorage.setItem('bearerToken', token);
  }

  getBearerToken() {
    return localStorage.getItem('bearerToken');
  }

  removeBearerToken() {
    localStorage.removeItem('bearerToken');
  }

  // Call the rest api to check whether the token is valid or not
  isUserAuthenticated(token): Promise<boolean> {
    // Here http client of angular returns an observable. We convert to promise (to make test case pass).
    // map loops through the observable and takes isAuthenticated from the response and binds it to res variable.
    // This res will be returned in promise.
    return this.httpClient.post<boolean>(this.authUrl + 'isAuthenticated', {}, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    }).map((res) => res['isAuthenticated']).toPromise();
  }

  getUsernameFromToken(token): Promise<string> {
    return this.httpClient.post<string>(this.authUrl + 'isAuthenticated', {}, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    }).map((res) => res['username']).toPromise();
  }
}
