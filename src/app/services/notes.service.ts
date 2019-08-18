import { Injectable } from '@angular/core';
import { Note } from '../note';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './authentication.service';
import { tap } from 'rxjs/operators';

// The service that makes the rest api calls for notes
@Injectable()
export class NotesService {

  notes: Array<Note> = new Array<Note>();
  notesSubject: BehaviorSubject<Array<Note>>;
  private token: string;
  private username: string;
  private noteUrl: string;

  // Injecting the angular httpclient and auth service
  constructor(private httpClient: HttpClient, public authService: AuthenticationService) {
    this.noteUrl = 'http://localhost:8082/api/v1/note/';
    this.token = this.authService.getBearerToken();
    this.notesSubject = new BehaviorSubject([]);
    this.fetchNotesFromServer(); // Call the fetch notes wheneven notes service is injected
  }

  // Function to fetch notes from server
  async fetchNotesFromServer() {
    this.token = this.authService.getBearerToken();
    // The async method execution is paused until 'this.authService.getUsernameFromToken' is resolved, so that this.username
    // in line 36 is correctly populated.
    this.username = await this.authService.getUsernameFromToken(this.token);
    /* Here the api call returns an observable. We subscribe to that observable. Inside subscribe we set the returned
    notes list and also feed that value to notes behavior subject, so that any observer registered to listen to notesSubject
    behavior subject will get the latest data */
    return this.httpClient.get<Note[]>(this.noteUrl + this.username, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
    }).subscribe(notes => {
      this.notes = notes;
      this.notesSubject.next(this.notes);
    },
    err => {
      // console.log(err.message)
      return err.message;
    }
    );
  }

  /* Function that returns the notes behavior subject to the registered observers (any method that calls this function). Since notes taker
  and notes view have been moved to 2 different components once notes is added inorder for notes view component to get the
  latest data we use behavior subject */
  getNotes(): BehaviorSubject<Array<Note>> {
    return this.notesSubject;
  }

  /* Function to fetch the notes */
  /*
  getNotes(): Observable<Array<Note>> {

    this.token = this.authService.getBearerToken();

    // Pass bearer token to access the restricted api
    return this.httpClient.get<Note[]>('http://localhost:3000/api/v1/notes', {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
    });
  }
  */

  // Function to save the notes
  addNote(note: Note): Observable<Note> {
    this.token = this.authService.getBearerToken();
    return this.httpClient.post<Note>(this.noteUrl + this.username, note, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
    }).pipe( // Pipe is alternative to subscribe used to chain various operators of observables
      tap(addedNote => { // After posting the data we update it to the behaviour subject so that all observers of that behavior subject get
      // the latest data
        this.notes.push(addedNote);
        this.notesSubject.next(this.notes);
      })
    );
  }

  // Function to edit the note
  editNote(note: Note): Observable<Note> {
    this.token = this.authService.getBearerToken();
    return this.httpClient.put<Note>(`${this.noteUrl}${this.username}/${note.id}`, note, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
    }).pipe( // Pipe is alternative to subscribe used to chain various operators of observables
      tap(editNote => { // After posting the data we update it to the behaviour subject so that all observers of that behavior subject get
        // the latest data
        const noteObj = this.notes.find(noteObject => noteObject.id === editNote.id); // Find the note based on id from note list
        Object.assign(noteObj, editNote); // Update that note with the new edited note
        this.notesSubject.next(this.notes); // Notify the behavior subject
      })
    );
  }

  // Function to delete the note
  deleteNote(note: Note): Observable<any> {
    this.token = this.authService.getBearerToken();
    return this.httpClient.delete<any>(`${this.noteUrl}${this.username}/${note.id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
    }).pipe( // Pipe is alternative to subscribe used to chain various operators of observables
      tap(response => { // After posting the data we update it to the behaviour subject so that all observers of that behavior subject get
        // the latest data
        this.notes.splice(this.notes.indexOf(note), 1); // Removing element from array. Fisrt param is the index of element to remove and the second is number of elements to remove.
        this.notesSubject.next(this.notes);
      })
    );
  }

  // Get a note based on id
  getNoteById(noteId): Note {
    const foundNote = this.notes.find(note => note.id == noteId); // Find the note based on id from note list
    return foundNote;
  }
}
