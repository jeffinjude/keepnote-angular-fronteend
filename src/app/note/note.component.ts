import { Component, Input } from '@angular/core';
import { Note } from '../note';
import { RouterService } from '../services/router.service';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})

// Component that diaplays a single note card content
export class NoteComponent {

  @Input() // Gets the note object values from notes-view component. Refer line 14 of note-view.component.html
  note: Note;

  constructor(private routerService: RouterService, private notesService: NotesService) {}

  openEditNoteView() {
    this.routerService.routeToEditNoteView(this.note.id);
  }

  deleteNote() {
    this.notesService.deleteNote(this.note).subscribe();
  }
}
