import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

/* The typescript logic for app component */
export class AppComponent implements OnInit {
  loginLogoutText: string = "Login"

  constructor(private authService: AuthenticationService, private router: Router ) {
    
  }

  /* Executes on component load */
  ngOnInit() {
    this.router.events.subscribe(
      (events) => {
        if(events instanceof NavigationStart) {
          if(events.url === '/login' || events.url === '/') {
            this.loginLogoutText = "Login";
          }
          else {
            this.loginLogoutText = "Logout";
          }
        }
      }
    );
  }
}
