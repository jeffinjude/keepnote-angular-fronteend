import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

// The service that handles any routing within the app
@Injectable()
export class RouterService {

  constructor(private router: Router, private location: Location) { }

  routeToDashboard() {
    // console.log('Routing to notes dashboard');
    if (this.router.isActive) {
      this.router.navigate(['dashboard']);
    }
  }

  routeToLogin() {
    // console.log('Routing to login');
    if (this.router.isActive) {
      this.router.navigate(['login']);
    }
  }

  // Routing to secondary route
  routeToEditNoteView(noteId) {
    // console.log('Routing to notes edit');
    this.router.navigate(['dashboard', {
      outlets: {
        noteEditOutlet: ['note', noteId, 'edit']
      }
    }]);
  }

  routeBack() {
    // console.log('Routing back');
    this.location.back();
  }

  routeToNoteView() {
    // console.log('Routing to notes view');
    this.router.navigate(['dashboard/view/noteview']);
  }

  routeToListView() {
    // console.log('Routing to notes list view');
    this.router.navigate(['dashboard/view/listview']);
  }
}
