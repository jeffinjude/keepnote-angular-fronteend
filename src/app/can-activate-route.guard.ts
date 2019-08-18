import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { RouterService } from './services/router.service';
import { AuthenticationService } from './services/authentication.service';


@Injectable()
export class CanActivateRouteGuard implements CanActivate {

  private bearerToken: string;
  private isAuthenticated: boolean;

  // Inject the router service and authentication service
  constructor(private routerService: RouterService, private authService: AuthenticationService) {
    // Set the bearer token from local storage
    this.bearerToken = this.authService.getBearerToken();
  }

  // Predefined method which executes when each guarded route is called
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    // Fetch bearer token from local storage
    this.bearerToken = this.authService.getBearerToken();

    // Rest call to check whether that token is valid
    /*
    this.authService.isUserAuthenticated(this.bearerToken).subscribe(
      res => {
        this.isAuthenticated = res['isAuthenticated'];
        // console.log('isAuthenticated:' + this.isAuthenticated);

        // Redirect to dashboard only if authenticated
        if (this.isAuthenticated) {
          this.routerService.routeToDashboard();
        } else {
          this.routerService.routeToLogin();
        }
      }
    );
    */

    /* Authentication service return type was changed to promise to make hobbes test case success. If the auth service returns a promise
    then return promise here also or else the routing will be inconsistent. We need routing logic to work only after the async auth service
    resolves the promise with true or false */
    return this.authService.isUserAuthenticated(this.bearerToken).then<boolean>(
      (res: boolean) => {
        console.log("Authentication result: " + res);
        if (!res) {
          this.routerService.routeToLogin(); // If false always route to login
        }
        return res;
      }
    ).catch(function (err) {
      throw new Error('Auth service error: ' + err);
    });
  }
}
