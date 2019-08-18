import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { AuthenticationService } from '../services/authentication.service';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {

  notStartedNotes: Array<Note>;
  startedNotes: Array<Note>;
  completedNotes: Array<Note>;

  errMessage: string;
  public note: Note;
  notes: Array<Note>;

  // Inject the required servies
  constructor(public authService: AuthenticationService, public noteService: NotesService) {
    this.note = new Note(); // Create a note obj
    this.notes = []; // Initialize the arrays
    this.notStartedNotes = [];
    this.startedNotes = [];
    this.completedNotes = [];
  }

  // Executes on component load
  ngOnInit() {
    // Subscribe to the getnotes of noteservice
    this.noteService.getNotes().subscribe(
      data => {
        this.notes = data; // Set the response data to notes list
        // Clear the arrays so that when new note is added from list view page duplicate records don't show up.
        // After new note is added behavior subject of get notes is updated so this subscribe logic will work again.
        this.notStartedNotes = [];
        this.startedNotes = [];
        this.completedNotes = [];
        // Populate corresponding lists
        for (const note of this.notes) {
          if (note.state === 'not-started') {
            this.notStartedNotes.push(note);
          } else if (note.state === 'started') {
            this.startedNotes.push(note);
          } else if (note.state === 'completed') {
            this.completedNotes.push(note);
          }
        }
      },
      err => this.errMessage = err.message
    );
  }
}
