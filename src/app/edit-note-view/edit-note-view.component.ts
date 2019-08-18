import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { Note } from '../note';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotesService } from '../services/notes.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-edit-note-view',
  templateUrl: './edit-note-view.component.html',
  styleUrls: ['./edit-note-view.component.css']
})

// Component that handles the edit process
export class EditNoteViewComponent implements OnInit, OnDestroy {
  note: Note;
  noteForm: FormGroup;
  states: Array<string> = ['not-started', 'started', 'completed'];
  errMessage: string;

  // To access the data (Refer line 22 of edit-note-opener.component.ts) in your dialog component, you have to use the MAT_DIALOG_DATA
  // injection token
  constructor(private dialogRef: MatDialogRef<EditNoteViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private noteService: NotesService,
    private routerService: RouterService) {
  }

  ngOnInit() {
    // When we load the edit note view we get the note id from data of edit note opener and use it to get the note object
    this.note = this.noteService.getNoteById(this.data.noteId);
  }

  onSave() {
    if (this.note.text !== '' && this.note.text !== '') {
      this.noteService.editNote(this.note).subscribe(
        data => { this.dialogRef.close(); },
        error => { this.errMessage = error.message; }
      );
    }
  }

  ngOnDestroy(): void {
    this.routerService.routeToDashboard();
  }
}
