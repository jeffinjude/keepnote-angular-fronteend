import { Component, OnInit } from '@angular/core';
import { RouterService } from '../services/router.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isNoteView = true;

  constructor(public routerService: RouterService, private router: Router) {
  }

  ngOnInit(): void {
  }

  toggleView() {
    // If the current url is in noteview then on click of toggle button we redirect to list view and vice versa
    if (this.router.url === '/dashboard/view/noteview') {
      this.isNoteView = false; // set this variable to handle the display of toggle button
      this.routerService.routeToListView();
    } else {
      this.isNoteView = true;
      this.routerService.routeToNoteView();
    }
  }

  openListView() {
    this.isNoteView = false;
    this.routerService.routeToListView();
  }

  openNoteView() {
    this.isNoteView = true;
    this.routerService.routeToNoteView();
  }
}
