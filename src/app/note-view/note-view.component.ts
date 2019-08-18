import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { AuthenticationService } from '../services/authentication.service';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-note-view',
  templateUrl: './note-view.component.html',
  styleUrls: ['./note-view.component.css']
})

// Component that displays the notes
export class NoteViewComponent implements OnInit {
  errMessage: string;
  public note: Note;
  notes: Array<Note>;

  // Inject the required servies
  constructor(public authService: AuthenticationService, public noteService: NotesService) {
    this.note = new Note(); // Create a note obj
    this.notes = []; // Initialize the note array
  }

  // Executes on component load
  ngOnInit() {
    // Subscribe to the getnotes of noteservice. getNotes returns a behavior subject. So if that behavior subject is modified anywhere else
    // , it reflects here
    this.noteService.getNotes().subscribe(
    data => { this.notes = data; /* Set the response data to notes list */},
      err => this.errMessage = err.message
    );
  }
}
