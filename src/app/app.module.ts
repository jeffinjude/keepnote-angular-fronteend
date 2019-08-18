import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderComponent } from './header/header.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { HttpClientModule } from '@angular/common/http';
import { NotesService } from './services/notes.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CanActivateRouteGuard } from './can-activate-route.guard';
import { RouterService } from './services/router.service';
import { AuthenticationService } from './services/authentication.service';
import { NoteTakerComponent } from './note-taker/note-taker.component';
import { NoteViewComponent } from './note-view/note-view.component';
import { NoteComponent } from './note/note.component';
import { EditNoteViewComponent } from './edit-note-view/edit-note-view.component';
import { EditNoteOpenerComponent } from './edit-note-opener/edit-note-opener.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import { HovereffectDirective } from './hovereffect.directive';
import { ListViewComponent } from './list-view/list-view.component';

/* We defines the route mappings here */
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [CanActivateRouteGuard], // guarded route
    children: [ // Child routes within dashboard
      { path: 'view/noteview', component: NoteViewComponent }, // Route displaying all notes
      { path: 'view/listview', component: ListViewComponent }, // Route displaying all notes based on status
      // Route displaying the note edit popup. EditNoteOpenerComponent is the component that opens the EditNoteViewComponent
      { path: 'note/:noteId/edit', component: EditNoteOpenerComponent, outlet: 'noteEditOutlet' }, // Refer line 8 of dashboard.component.html
      // Default route of dashboard - if no route is given after localhost\dashboard
      { path: '', redirectTo: 'view/noteview', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' } // Default path to redirect - if no route is given after localhost
];

@NgModule({
  /* Here you give all the components of your app */
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    LoginComponent,
    NoteTakerComponent,
    NoteViewComponent,
    NoteComponent,
    EditNoteOpenerComponent,
    EditNoteViewComponent,
    HovereffectDirective,
    ListViewComponent
  ],
  /* Here you import any other external modules */
  imports: [
    BrowserModule,
    // AppRoutingModule,
    MatToolbarModule,
    MatExpansionModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatButtonModule,
    FormsModule,
    MatCardModule,
    MatListModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSidenavModule,
    RouterModule.forRoot(routes), // In angular 7 onwards we have seperate ts file for routes - app-routing.module.ts
    MatDialogModule,
    MatSelectModule
  ],
  /* Here you register the service NotesService etc with root injector
    i.e the service has shared instance with all components of the app.
  */
  providers: [
    NotesService,
    CanActivateRouteGuard,
    RouterService,
    AuthenticationService
  ],
  /* Here you give the bootstraping component */
  bootstrap: [AppComponent],
  entryComponents: [EditNoteViewComponent]
  // All the components given in route are entry components but no need to add them explicitly.
  // Refer https://angular.io/guide/entry-components. For any component loaded into a dialog,
  // you must include your component class in the list of entryComponents in your NgModule definition.
})

export class AppModule { }
