import { Component, OnInit, ViewChild } from '@angular/core';
import { Note } from '../note';
import { FormGroup, FormGroupDirective, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-note-taker',
  templateUrl: './note-taker.component.html',
  styleUrls: ['./note-taker.component.css']
})

// Component that handles the note add process - This was done using template driven form (to make test case pass).
export class NoteTakerComponent implements OnInit {
  errMessage: string;
  public note: Note;
  public notes: Note[];

  // Inject the required servies
  constructor(public authService: AuthenticationService, public noteService: NotesService) {
    this.note = new Note(); // Create a note obj
    this.notes = []; // Initialize the note array
  }

  // Executes on component load
  ngOnInit() {

  }

  // Method to save the note
  addNote() {
    // The input values in the form will be available in noteForm.value as a json.
    const noteObj: Note = new Note();
    noteObj.title = this.note.title;
    noteObj.text = this.note.text;
    noteObj.state = 'not-started'; // Initially the note state will be always as not-started

    if (this.note.text !== '' && this.note.text !== '') {
      this.errMessage = '';

      /* We push it to notes array so that UI is updated without page reload.
      If not done, the newly added value is saved in db but not update in UI without page reload */
      this.notes.push(noteObj);
      // console.log(this.notes);

      /* Call the noteservice to save the note obj to db */
      this.noteService.addNote(noteObj).subscribe(
        data => {
          // console.log('Note added through Note Service.');
        },
        err => this.errMessage = err.message
      );

      this.note.title = ''; // To reset form values after submission
      this.note.text = '';
    } else {
      this.errMessage = 'Title and Text both are required fields';
    }
  }
}
